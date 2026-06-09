# ─── Build stage ──────────────────────────────────────────────────────────────
FROM ubuntu:22.04

# Prevent interactive prompts during apt installs
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
        libreoffice \
        python3 \
        python3-pip \
        ghostscript \
        build-essential \
        libmagic1 \
        poppler-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps first (layer cached unless requirements change)
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy application source
COPY app.py \
     file_manager.py \
     converter.py \
     compressor.py \
     image_converter.py \
     merge.py \
     protector.py \
     split.py \
     ./

# Runtime directories (also created by FileManager, but good to declare)
RUN mkdir -p /tmp/uploads /tmp/zips

EXPOSE 8000

# ─── How to run behind Nginx / Caddy (handles TLS) ───────────────────────────
# The app trusts X-Forwarded-Proto so request.url_for() returns https://
# when your reverse proxy sets that header.
# ─────────────────────────────────────────────────────────────────────────────
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "*"]
