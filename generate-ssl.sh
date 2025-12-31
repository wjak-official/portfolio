#!/bin/bash

# Generate self-signed SSL certificates for development
# Run this script to create ssl/cert.pem and ssl/key.pem

mkdir -p ssl

openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

echo "SSL certificates generated in ssl/ directory"
echo "cert.pem and key.pem are ready for development use"
