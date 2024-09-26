webhook_handler.py:
```python
import os
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer

class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        print(f"Received POST data: {post_data.decode('utf-8')}")
        try:
            subprocess.run(['git', 'pull'], check=True, cwd='/home/ubuntu/CodoCodile2024-Website')
            subprocess.run(['sudo','docker-compose', 'up', '-d', '--build'], check=True, cwd='/home/ubuntu/CodoCodile2024-Website')
            print("Successfully deployed")
        except subprocess.CalledProcessError as e:
            print(f"Error during deployment: {e}")

        self.send_response(200)
        self.end_headers()

def run(server_class=HTTPServer, handler_class=WebhookHandler, port=3000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Listening on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run()
```

set webhook service on server:
```sh
sudo nano /etc/systemd/system/new_webhook.service
```

new_webhook.service:
```sh
[Unit]
Description=New Webhook Service
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/CodoCodile2024-Website
ExecStart=/usr/bin/python3 /home/ubuntu/webhook_handler.py
Restart=always

[Install]
WantedBy=multi-user.target
```

start service:
```sh
sudo systemctl start new_webhook.service
sudo systemctl enable new_webhook.service
``` 

see status of service:
```sh
sudo systemctl status new_webhook.service 
```

see logs of service: 
```sh
sudo journalctl -u new_webhook.service -f
```