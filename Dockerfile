FROM python:3.11-slim

WORKDIR /app

# Copy backend requirements
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/ ./backend/

# Create necessary directories
RUN mkdir -p backend/storage backend/uploads

# Set working directory to backend
WORKDIR /app/backend

EXPOSE 8000

CMD ["python", "app.py"]


