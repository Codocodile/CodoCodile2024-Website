FROM docker.arvancloud.ir/python:latest

WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv
RUN ./venv/bin/pip install --upgrade pip && ./venv/bin/pip install -r requirements.txt
COPY . .
RUN ./venv/bin/python manage.py migrate

EXPOSE 8000

CMD ["./venv/bin/python", "manage.py", "runserver","0.0.0.0:8000"]
