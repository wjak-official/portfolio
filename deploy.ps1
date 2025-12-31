# Portfolio Deployment Script for Windows (PowerShell)
# This script helps deploy the portfolio with Docker and Let's Encrypt SSL

param(
    [string]$Command = "deploy"
)

# Configuration
$DOMAIN = "api.ifreelance4u.com"
$WWW_DOMAIN = "www.$DOMAIN"
$EMAIL = "info@ifreelance4u.com"

# Colors for output (PowerShell console colors)
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"
$White = "White"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = $White
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] $Message" -ForegroundColor $Color
}

function Write-Log {
    param([string]$Message)
    Write-ColorOutput $Message $Green
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "ERROR: $Message" $Red
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "WARNING: $Message" $Yellow
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput "INFO: $Message" $Blue
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "SUCCESS: $Message" $Cyan
}

# Check if running as administrator for SSL operations
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Generate cryptographically secure random secret
function New-SecureSecret {
    try {
        # Use .NET cryptography for secure random generation
        $rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
        $bytes = New-Object byte[] 32
        $rng.GetBytes($bytes)
        $rng.Dispose()

        # Convert to hex string
        $hexString = [System.BitConverter]::ToString($bytes) -replace '-', ''
        return $hexString.ToLower()
    }
    catch {
        Write-Error "Failed to generate secure secret: $($_.Exception.Message)"
        return $null
    }
}

# Create necessary directories
function New-RequiredDirectories {
    Write-Log "Creating necessary directories..."

    $directories = @("ssl-challenge", "logs", "ssl")

    foreach ($dir in $directories) {
        if (!(Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Log "Created directory: $dir"
        }
        else {
            Write-Log "Directory already exists: $dir"
        }
    }
    return $true
}

# Setup environment file with generated secrets
function New-EnvironmentFile {
    if (Test-Path ".env") {
        Write-Log ".env file already exists"
        Write-Warning "Creating backup of existing .env file..."

        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $backupPath = ".env.backup.$timestamp"
        Copy-Item ".env" $backupPath
        Write-Info "Backup created: $backupPath"
        Write-Info "Delete .env and run setup again if you need new secrets."
        return $true
    }

    Write-Log "Creating .env file with generated secrets..."

    # Generate secure secrets
    $sessionSecret = New-SecureSecret
    $csrfSecret = New-SecureSecret

    if ([string]::IsNullOrEmpty($sessionSecret) -or [string]::IsNullOrEmpty($csrfSecret)) {
        Write-Error "Failed to generate secure secrets"
        return $false
    }

    # Create .env file content
    $envContent = @"
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
SESSION_SECRET=$sessionSecret
CSRF_SECRET=$csrfSecret

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
"@

    # Write to file
    $envContent | Out-File -FilePath ".env" -Encoding UTF8

    Write-Success ".env file created with secure auto-generated secrets"
    Write-Warning "IMPORTANT: Update SMTP_USER and SMTP_PASS in .env file!"
    Write-Warning "These are required for the contact form to work."
    Write-Host ""
    Write-Info "Generated secrets:"
    Write-Host "  SESSION_SECRET: $($sessionSecret.Substring(0,16))..."
    Write-Host "  CSRF_SECRET: $($csrfSecret.Substring(0,16))..."
    Write-Host ""

    return $true
}

# Generate self-signed certificates for development
function New-DevelopmentCertificates {
    $certPath = "ssl/cert.pem"
    $keyPath = "ssl/key.pem"

    if ((Test-Path $certPath) -and (Test-Path $keyPath)) {
        Write-Log "SSL certificates already exist"
        return $true
    }

    Write-Log "Generating self-signed SSL certificates for development..."

    try {
        # Check if OpenSSL is available
        $openssl = Get-Command openssl -ErrorAction SilentlyContinue
        if ($openssl) {
            # Use OpenSSL to generate certificates
            $opensslCommand = "openssl req -x509 -newkey rsa:4096 -keyout `"$keyPath`" -out `"$certPath`" -days 365 -nodes -subj `"/C=US/ST=State/L=City/O=iFreelance4u/CN=$DOMAIN`""
            Invoke-Expression $opensslCommand

            if ($LASTEXITCODE -eq 0) {
                Write-Log "Development certificates created in ssl/ directory"
                return $true
            }
            else {
                Write-Error "Failed to generate certificates with OpenSSL"
                return $false
            }
        }
        else {
            Write-Warning "OpenSSL not found. Please install OpenSSL or generate certificates manually."
            Write-Info "You can download OpenSSL from: https://slproweb.com/products/Win32OpenSSL.html"
            return $false
        }
    }
    catch {
        Write-Error "Failed to generate SSL certificates: $($_.Exception.Message)"
        return $false
    }
}

# Start Docker services
function Start-DockerServices {
    Write-Log "Starting Docker services..."

    try {
        # Check if Docker is running
        $dockerVersion = docker version 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Docker is not running or not installed. Please start Docker Desktop."
            return $false
        }

        # Start services
        docker-compose up -d

        if ($LASTEXITCODE -eq 0) {
            Write-Log "Services started. Waiting for health checks..."
            Start-Sleep -Seconds 10
            return $true
        }
        else {
            Write-Error "Failed to start Docker services"
            return $false
        }
    }
    catch {
        Write-Error "Error starting Docker services: $($_.Exception.Message)"
        return $false
    }
}

# Check deployment status
function Test-DeploymentStatus {
    Write-Log "Checking deployment status..."

    try {
        # Check Docker services
        docker-compose ps

        # Test Nginx health (ignore SSL certificate warnings)
        $nginxTest = curl -k https://localhost/health 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Nginx is responding"
        }
        else {
            Write-Warning "Nginx health check failed"
        }

        # Test Node.js application
        $nodeTest = curl http://localhost:3000/api/health 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Node.js application is responding"
        }
        else {
            Write-Warning "Node.js application health check failed"
        }
    }
    catch {
        Write-Warning "Some health checks failed. This is normal during initial startup."
    }
}

# Issue Let's Encrypt certificate
function New-LetsEncryptCertificate {
    if (!(Test-Administrator)) {
        Write-Warning "SSL certificate issuance requires administrator privileges"
        Write-Info "Please run this command as Administrator:"
        Write-Host "   Start-Process powershell -Verb RunAs -ArgumentList `"-Command & { & '$PSScriptRoot\deploy.ps1' -Command ssl-issue }`""
        return $false
    }

    Write-Log "Issuing Let's Encrypt SSL certificate..."

    try {
        # Run certbot
        docker run --rm -v "${PWD}/ssl-challenge:/var/www/certbot" -v "${PWD}/letsencrypt:/etc/letsencrypt" certbot/certbot:latest certonly --webroot --webroot-path=/var/www/certbot --email $EMAIL --agree-tos --no-eff-email -d $DOMAIN -d $WWW_DOMAIN

        if ($LASTEXITCODE -eq 0) {
            Write-Success "Certificate issued successfully!"
            Write-Log "Reloading nginx configuration..."
            docker-compose exec nginx nginx -s reload
            return $true
        }
        else {
            Write-Error "Failed to issue certificate"
            return $false
        }
    }
    catch {
        Write-Error "Error issuing certificate: $($_.Exception.Message)"
        return $false
    }
}

# Setup automatic renewal (requires administrator)
function Set-AutomaticRenewal {
    if (!(Test-Administrator)) {
        Write-Warning "Automatic renewal setup requires administrator privileges"
        Write-Info "Please run this command as Administrator:"
        Write-Host "   Start-Process powershell -Verb RunAs -ArgumentList `"-Command & { & '$PSScriptRoot\deploy.ps1' -Command setup-renewal }`""
        return $false
    }

    Write-Log "Setting up automatic SSL certificate renewal..."

    try {
        # Check if task already exists
        $existingTask = Get-ScheduledTask -TaskName "Portfolio SSL Renewal" -ErrorAction SilentlyContinue

        if ($existingTask) {
            Write-Log "Automatic renewal already scheduled"
            return $true
        }

        # Create new scheduled task
        $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-Command & { & '$PSScriptRoot/ssl-renew.ps1' renew }"
        $trigger = New-ScheduledTaskTrigger -Daily -At "12:00"
        $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
        $principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -RunLevel Highest

        Register-ScheduledTask -TaskName "Portfolio SSL Renewal" -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "Automatic SSL certificate renewal for portfolio"

        Write-Success "Automatic renewal scheduled (runs daily at 12:00)"
        return $true
    }
    catch {
        Write-Error "Failed to setup automatic renewal: $($_.Exception.Message)"
        return $false
    }
}

# Main deployment function
function Invoke-Deployment {
    Write-Log "🚀 Starting portfolio deployment for $DOMAIN"
    Write-Host ""

    # Run deployment steps
    $result = New-RequiredDirectories
    if (!$result) { return $false }

    $result = New-EnvironmentFile
    if (!$result) { return $false }

    $result = New-DevelopmentCertificates
    if (!$result) { Write-Warning "SSL certificate generation failed - you can generate them manually later" }

    $result = Start-DockerServices
    if (!$result) { return $false }

    Write-Host ""
    Write-Info "Deployment steps completed!"
    Write-Host ""
    Write-Info "Next steps:"
    Write-Host "1. ✅ .env file created with auto-generated secure secrets"
    Write-Host "2. 🔧 Edit .env file to configure SMTP_USER and SMTP_PASS for email"
    Write-Host "3. 🌐 Point your domain DNS ($DOMAIN) to this server IP"
    Write-Host "4. 🔒 Run: .\deploy.ps1 -Command ssl-issue (for production SSL)"
    Write-Host "5. 🔄 Run: .\deploy.ps1 -Command setup-renewal (automatic SSL renewal)"
    Write-Host ""
    Write-Info "Access your site at:"
    Write-Host "   Development: https://localhost (self-signed cert)"
    Write-Host "   Production:  https://$DOMAIN (after SSL setup)"
    Write-Host ""
    Write-Info "Generated secrets have been saved to .env"
    Write-Info "Keep this file secure and never commit it to version control!"

    Test-DeploymentStatus
    return $true
}

# Main script logic
switch ($Command) {
    "deploy" {
        $result = Invoke-Deployment
        if (!$result) {
            exit 1
        }
    }
    "ssl-issue" {
        $result = New-LetsEncryptCertificate
        if (!$result) {
            exit 1
        }
    }
    "ssl-renew" {
        Write-Log "Renewing SSL certificate..."
        # Call the bash script if it exists, otherwise show manual instructions
        if (Test-Path "ssl-renew.sh") {
            & bash ssl-renew.sh renew
        }
        else {
            Write-Info "Please run the SSL renewal manually or use the bash script"
        }
    }
    "setup-renewal" {
        $result = Set-AutomaticRenewal
        if (!$result) {
            exit 1
        }
    }
    "status" {
        Test-DeploymentStatus
    }
    "logs" {
        docker-compose logs -f
    }
    "restart" {
        Write-Log "Restarting services..."
        docker-compose restart
    }
    "stop" {
        Write-Log "Stopping services..."
        docker-compose down
    }
    default {
        Write-Host "Portfolio Deployment Script for Windows (PowerShell)"
        Write-Host ""
        Write-Host "Usage: .\deploy.ps1 [-Command] <command>"
        Write-Host ""
        Write-Host "Commands:"
        Write-Host "  deploy         - Full deployment with auto-generated secrets (default)"
        Write-Host "  ssl-issue      - Issue Let's Encrypt SSL certificate (requires admin)"
        Write-Host "  ssl-renew      - Renew SSL certificate"
        Write-Host "  setup-renewal  - Setup automatic SSL renewal (requires admin)"
        Write-Host "  status         - Check deployment status"
        Write-Host "  logs           - Show service logs"
        Write-Host "  restart        - Restart services"
        Write-Host "  stop           - Stop services"
        Write-Host "  help           - Show this help"
        Write-Host ""
        Write-Host "Domain: $DOMAIN"
        Write-Host "Email: $EMAIL"
        Write-Host ""
        Write-Host "The 'deploy' command will:"
        Write-Host "  - Generate cryptographically secure secrets"
        Write-Host "  - Create .env file with production configuration"
        Write-Host "  - Create backups of existing .env files (if any)"
        Write-Host "  - Setup development SSL certificates"
        Write-Host "  - Start all Docker services"
        Write-Host "  - Run health checks"
        Write-Host ""
        Write-Host "Examples:"
        Write-Host "  .\deploy.ps1                          # Full deployment"
        Write-Host "  .\deploy.ps1 -Command ssl-issue       # Issue SSL cert"
        Write-Host "  .\deploy.ps1 -Command status          # Check status"
    }
}
