 
```
sudo docker-compose up -d --build
```
```
sudo systemctl start webhook.service
sudo systemctl enable webhook.service
sudo systemctl status webhook.service 

``` 

see logs: 
```
sudo journalctl -u webhook.service -f
```


webhook handler:
```
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
            subprocess.run(['docker-compose', 'up', '-d', '--build'], check=True, cwd='/home/ubuntu/CodoCodile2024-Website')
            print("Successfully deployed")
        except subprocess.CalledProcessError as e:
            print(f"Error during deployment: {e}")

        self.send_response(200)
        self.end_headers()

def run(server_class=HTTPServer, handler_class=WebhookHandler, port=3000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Listening for webhooks on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run()   
```
