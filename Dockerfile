# Multi-stage build for Stitch & Style

# Frontend build stage
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Backend stage
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY tryon-server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy backend source
COPY tryon-server/ .

# Copy frontend build from builder stage
COPY --from=frontend-builder /app/dist /app/static/dist

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run the application
CMD ["gunicorn", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000", "app:app"]
