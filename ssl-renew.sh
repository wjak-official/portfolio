#!/bin/bash

# Let's Encrypt SSL Certificate Management Script
# This script handles certificate issuance and renewal

set -e

DOMAIN="api.ifreelance4u.com"
EMAIL="info@ifreelance4u.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" >&2
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
   error "This script must be run as root or with sudo"
   exit 1
fi

# Create necessary directories
log "Creating necessary directories..."
mkdir -p ssl-challenge
mkdir -p logs

# Function to issue certificate
issue_certificate() {
    log "Issuing Let's Encrypt certificate for $DOMAIN..."

    docker run --rm \
        -v "$(pwd)/ssl-challenge:/var/www/certbot" \
        -v "$(pwd)/letsencrypt:/etc/letsencrypt" \
        certbot/certbot:latest \
        certonly --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d "$DOMAIN" \
        -d "www.$DOMAIN"

    if [[ $? -eq 0 ]]; then
        log "Certificate issued successfully!"
        log "Reloading nginx configuration..."
        docker-compose exec nginx nginx -s reload
    else
        error "Failed to issue certificate"
        exit 1
    fi
}

# Function to renew certificate
renew_certificate() {
    log "Checking for certificate renewal..."

    docker run --rm \
        -v "$(pwd)/ssl-challenge:/var/www/certbot" \
        -v "$(pwd)/letsencrypt:/etc/letsencrypt" \
        certbot/certbot:latest \
        renew

    if [[ $? -eq 0 ]]; then
        log "Certificate renewed successfully!"
        log "Reloading nginx configuration..."
        docker-compose exec nginx nginx -s reload
    else
        warn "Certificate renewal not needed or failed"
    fi
}

# Function to check certificate expiry
check_expiry() {
    if [[ -f "letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
        EXPIRY_DATE=$(openssl x509 -enddate -noout -in "letsencrypt/live/$DOMAIN/fullchain.pem" | cut -d= -f2)
        EXPIRY_TIMESTAMP=$(date -d "$EXPIRY_DATE" +%s)
        CURRENT_TIMESTAMP=$(date +%s)
        DAYS_LEFT=$(( (EXPIRY_TIMESTAMP - CURRENT_TIMESTAMP) / 86400 ))

        if [[ $DAYS_LEFT -le 30 ]]; then
            warn "Certificate expires in $DAYS_LEFT days. Consider renewing."
        else
            log "Certificate is valid for $DAYS_LEFT more days."
        fi
    else
        warn "No certificate found. Run 'issue' command first."
    fi
}

# Main script logic
case "${1:-help}" in
    "issue")
        issue_certificate
        ;;
    "renew")
        renew_certificate
        ;;
    "check")
        check_expiry
        ;;
    "help"|*)
        echo "Let's Encrypt SSL Certificate Management"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  issue   - Issue a new SSL certificate"
        echo "  renew   - Renew existing certificate"
        echo "  check   - Check certificate expiry date"
        echo "  help    - Show this help message"
        echo ""
        echo "Make sure to:"
        echo "1. Update DOMAIN and EMAIL variables in this script"
        echo "2. Update docker-compose.yml certbot command with your domain"
        echo "3. Update nginx.conf with your domain"
        echo "4. Point your domain DNS to this server"
        echo "5. Ensure ports 80 and 443 are open"
        ;;
esac
