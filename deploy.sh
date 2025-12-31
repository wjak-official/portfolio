#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy the portfolio with Docker and Let's Encrypt SSL

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'    info "Next steps:"
    echo "1. ✅ .env file created with auto-generated secure secrets"
    echo "2. 🔧 Edit .env file to configure SMTP_USER and SMTP_PASS for email"
    echo "3. 🌐 Point your domain DNS ($DOMAIN) to this server IP"
    echo "4. 🔒 Run: sudo ./deploy.sh ssl-issue (for production SSL)"
    echo "5. 🔄 Run: sudo ./deploy.sh setup-renewal (automatic SSL renewal)"
    echo
    info "Access your site at:"
    echo "   Development: https://localhost (self-signed cert)"
    echo "   Production:  https://$DOMAIN (after SSL setup)"
    echo
    info "Generated secrets have been saved to .env"
    info "Keep this file secure and never commit it to version control!" # No Color

DOMAIN="api.ifreelance4u.com"
WWW_DOMAIN="api.ifreelance4u.com"
EMAIL="info@ifreelance4u.com"

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" >&2
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Check if running as root for SSL operations
check_permissions() {
    if [[ $EUID -ne 0 ]]; then
        warn "Some operations require root privileges. Please run with sudo when prompted."
    fi
}

# Create necessary directories
create_directories() {
    log "Creating necessary directories..."
    mkdir -p ssl-challenge
    mkdir -p logs
    mkdir -p ssl
}

# Generate cryptographically secure random secret
generate_secret() {
    # Generate a 64-character random string using /dev/urandom
    if command -v openssl &> /dev/null; then
        openssl rand -hex 32
    else
        # Fallback to /dev/urandom if openssl is not available
        head -c 32 /dev/urandom | xxd -p -c 32 | tr -d '\n'
    fi
}

# Setup environment file with generated secrets
setup_environment() {
    if [[ ! -f ".env" ]]; then
        log "Creating .env file with generated secrets..."

        # Generate secure secrets
        SESSION_SECRET=$(generate_secret)
        CSRF_SECRET=$(generate_secret)

        if [[ -z "$SESSION_SECRET" ]] || [[ -z "$CSRF_SECRET" ]]; then
            error "Failed to generate secure secrets"
            exit 1
        fi

        # Create .env file with generated secrets and defaults
        cat > .env << EOF
# Domain Configuration (API subdomain for backend)
DOMAIN=api.ifreelance4u.com
WWW_DOMAIN=api.ifreelance4u.com

# SSL Configuration
SSL_EMAIL=info@ifreelance4u.com
FORCE_HTTPS=true

# Server Configuration
PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# Security - Auto-generated cryptographically secure secrets
SESSION_SECRET=${SESSION_SECRET}
CSRF_SECRET=${CSRF_SECRET}

# Email Configuration (REQUIRED - Update these values!)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM="Ifreelance4u <info@ifreelance4u.com>"

# CORS - Allow requests from GitHub Pages domain
ALLOWED_ORIGINS=https://uat.ifreelance4u.com,https://www.uat.ifreelance4u.com,https://api.ifreelance4u.com

# Rate Limiting Configuration
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
CONTACT_RATE_LIMIT_WINDOW=3600000
CONTACT_RATE_LIMIT_MAX=3

# Performance
COMPRESSION_LEVEL=6
CACHE_MAX_AGE=86400

# Security Headers
HSTS_MAX_AGE=31536000
HSTS_INCLUDE_SUBDOMAINS=true
HSTS_PRELOAD=false

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Monitoring (optional)
SENTRY_DSN=
NEW_RELIC_LICENSE_KEY=
EOF

        log "✅ .env file created with secure auto-generated secrets"
        warn "⚠️  IMPORTANT: Update SMTP_USER and SMTP_PASS in .env file!"
        warn "   These are required for the contact form to work."
        echo
        info "Generated secrets:"
        echo "  SESSION_SECRET: ${SESSION_SECRET}"
        echo "  CSRF_SECRET: ${CSRF_SECRET}"
        echo
    else
        log ".env file already exists"
        warn "Creating backup of existing .env file..."
        cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
        info "Backup created. Delete .env and run setup again if you need new secrets."
    fi
}

# Generate self-signed certificates for development
generate_dev_certs() {
    if [[ ! -f "ssl/cert.pem" ]]; then
        log "Generating self-signed SSL certificates for development..."
        openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
          -subj "/C=US/ST=State/L=City/O=iFreelance4u/CN=$DOMAIN"
        log "Development certificates created in ssl/ directory"
    else
        log "SSL certificates already exist"
    fi
}

# Start services
start_services() {
    log "Starting Docker services..."
    docker-compose up -d
    log "Services started. Waiting for health checks..."
    sleep 10
}

# Issue Let's Encrypt certificate
issue_ssl() {
    check_permissions
    log "Issuing Let's Encrypt SSL certificate..."

    if [[ $EUID -eq 0 ]]; then
        ./ssl-renew.sh issue
    else
        warn "SSL certificate issuance requires root privileges"
        info "Run: sudo ./ssl-renew.sh issue"
    fi
}

# Setup automatic renewal
setup_renewal() {
    check_permissions
    log "Setting up automatic SSL certificate renewal..."

    if [[ $EUID -eq 0 ]]; then
        # Check if cron job already exists
        if ! crontab -l | grep -q "ssl-renew.sh renew"; then
            (crontab -l ; echo "0 12,0 * * * $(pwd)/ssl-renew.sh renew") | crontab -
            log "Automatic renewal scheduled (runs at 12:00 and 00:00 daily)"
        else
            log "Automatic renewal already scheduled"
        fi
    else
        warn "Automatic renewal setup requires root privileges"
        info "Run: sudo ./ssl-renew.sh setup-renewal"
    fi
}

# Check deployment status
check_status() {
    log "Checking deployment status..."
    docker-compose ps

    log "Checking service health..."
    if curl -f -k https://localhost/health > /dev/null 2>&1; then
        log "✅ Nginx is responding"
    else
        warn "❌ Nginx health check failed"
    fi

    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log "✅ Node.js application is responding"
    else
        warn "❌ Node.js application health check failed"
    fi
}

# Main deployment function
deploy() {
    log "🚀 Starting portfolio deployment for $DOMAIN"
    echo

    create_directories
    setup_environment
    generate_dev_certs
    start_services

    echo
    info "Deployment steps completed!"
    echo
    info "Next steps:"
    echo "1. Edit .env file with your actual configuration"
    echo "2. Point your domain DNS to this server:"
    echo "   - $DOMAIN → $(curl -s ifconfig.me || echo 'your-server-ip')"
    echo "   - $WWW_DOMAIN → same IP"
    echo "3. Run: sudo ./ssl-renew.sh issue (to get Let's Encrypt SSL)"
    echo "4. Run: sudo ./ssl-renew.sh setup-renewal (for automatic renewal)"
    echo
    info "Access your site at:"
    echo "   HTTP:  http://$DOMAIN"
    echo "   HTTPS: https://$DOMAIN (after SSL setup)"
    echo
    check_status
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "ssl-issue")
        issue_ssl
        ;;
    "ssl-renew")
        ./ssl-renew.sh renew
        ;;
    "setup-renewal")
        setup_renewal
        ;;
    "status")
        check_status
        ;;
    "logs")
        docker-compose logs -f
        ;;
    "restart")
        docker-compose restart
        ;;
    "stop")
        docker-compose down
        ;;
    "help"|*)
        echo "Portfolio Deployment Script"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  deploy         - Full deployment with auto-generated secrets (default)"
        echo "  ssl-issue      - Issue Let's Encrypt SSL certificate"
        echo "  ssl-renew      - Renew SSL certificate"
        echo "  setup-renewal  - Setup automatic SSL renewal"
        echo "  status         - Check deployment status"
        echo "  logs           - Show service logs"
        echo "  restart        - Restart services"
        echo "  stop           - Stop services"
        echo "  help           - Show this help"
        echo ""
        echo "Domain: $DOMAIN"
        echo "Email: $EMAIL"
        echo ""
        echo "The 'deploy' command will:"
        echo "  - Generate cryptographically secure secrets"
        echo "  - Create .env file with production configuration"
        echo "  - Setup development SSL certificates"
        echo "  - Start all Docker services"
        echo "  - Run health checks"
        ;;
esac
