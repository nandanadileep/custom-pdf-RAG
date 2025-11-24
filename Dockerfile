FROM node:20 AS frontend

WORKDIR /app/frontend
COPY frontend/cute-chatpdf-ui/package.json frontend/cute-chatpdf-ui/package-lock.json ./
RUN npm install

COPY frontend/cute-chatpdf-ui .
RUN npm run build


FROM python:3.10-slim AS backend

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies first (for better caching)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application files
COPY backend/ .

# Copy frontend build
COPY --from=frontend /app/frontend/dist ./static

# Set environment variables
ENV PORT=8000
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

# Start the application
# Note: The app.py file should be in /app directory after COPY backend/ .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]