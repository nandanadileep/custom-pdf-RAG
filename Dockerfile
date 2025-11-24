FROM node:18 AS frontend

WORKDIR /app/frontend
COPY frontend/cute-chatpdf-ui/package.json frontend/cute-chatpdf-ui/package-lock.json ./
RUN npm install

COPY frontend/cute-chatpdf-ui .
RUN npm run build


FROM python:3.10-slim AS backend

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend /app
COPY --from=frontend /app/frontend/dist ./static

ENV PORT=8000

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
