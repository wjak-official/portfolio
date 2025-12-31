# SSL Certificate Management Script for Windows (PowerShell)
# This script handles certificate issuance and renewal

param(
    [string]$Command = "help"
)

# Configuration
$DOMAIN = "api.ifreelance4u.com"
$EMAIL = "info@ifreelance4u.com"

# Colors for output (PowerShell console colors)
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
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

# Check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Issue SSL certificate
function New-SSLCertificate {
    Write-Log "Issuing Let's Encrypt SSL certificate for $DOMAIN..."

    try {
        # Run certbot
        docker run --rm -v "${PWD}/ssl-challenge:/var/www/certbot" -v "${PWD}/letsencrypt:/etc/letsencrypt" certbot/certbot:latest certonly --webroot --webroot-path=/var/www/certbot --email $EMAIL --agree-tos --no-eff-email -d $DOMAIN -d "www.$DOMAIN"

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

# Renew SSL certificate
function Update-SSLCertificate {
    Write-Log "Checking for certificate renewal..."

    try {
        # Run certbot renew
        docker run --rm -v "${PWD}/ssl-challenge:/var/www/certbot" -v "${PWD}/letsencrypt:/etc/letsencrypt" certbot/certbot:latest renew

        if ($LASTEXITCODE -eq 0) {
            Write-Success "Certificate renewed successfully!"
            Write-Log "Reloading nginx configuration..."
            docker-compose exec nginx nginx -s reload
            return $true
        }
        else {
            Write-Warning "Certificate renewal not needed or failed"
            return $false
        }
    }
    catch {
        Write-Error "Error renewing certificate: $($_.Exception.Message)"
        return $false
    }
}

# Check certificate expiry
function Test-CertificateExpiry {
    $certPath = "letsencrypt/live/$DOMAIN/fullchain.pem"

    if (!(Test-Path $certPath)) {
        Write-Warning "No certificate found. Run 'issue' command first."
        return $false
    }

    try {
        # Use OpenSSL to check expiry if available
        $openssl = Get-Command openssl -ErrorAction SilentlyContinue
        if ($openssl) {
            $expiryInfo = & openssl x509 -enddate -noout -in $certPath
            if ($LASTEXITCODE -eq 0) {
                $expiryDateString = $expiryInfo -replace "notAfter=", ""
                $expiryDate = [DateTime]::Parse($expiryDateString)
                $currentDate = Get-Date
                $daysLeft = ($expiryDate - $currentDate).Days

                if ($daysLeft -le 30) {
                    Write-Warning "Certificate expires in $daysLeft days. Consider renewing."
                }
                else {
                    Write-Log "Certificate is valid for $daysLeft more days."
                }
                return $true
            }
        }

        # Fallback: just check if file exists and is recent
        $certFile = Get-Item $certPath
        $daysSinceModified = ((Get-Date) - $certFile.LastWriteTime).Days

        if ($daysSinceModified -gt 80) {  # Let's Encrypt certs are valid for 90 days
            Write-Warning "Certificate file is $($daysSinceModified) days old. Consider renewing."
        }
        else {
            Write-Log "Certificate file appears to be recent ($($daysSinceModified) days old)."
        }
        return $true
    }
    catch {
        Write-Error "Error checking certificate expiry: $($_.Exception.Message)"
        return $false
    }
}

# Main script logic
switch ($Command) {
    "issue" {
        if (!(Test-Administrator)) {
            Write-Warning "SSL certificate operations require administrator privileges"
            Write-Info "Please run this command as Administrator:"
            Write-Host "   Start-Process powershell -Verb RunAs -ArgumentList `"-Command & { & '$PSScriptRoot\ssl-renew.ps1' -Command issue }`""
            exit 1
        }
        $result = New-SSLCertificate
        if (!$result) {
            exit 1
        }
    }
    "renew" {
        if (!(Test-Administrator)) {
            Write-Warning "SSL certificate operations require administrator privileges"
            Write-Info "Please run this command as Administrator:"
            Write-Host "   Start-Process powershell -Verb RunAs -ArgumentList `"-Command & { & '$PSScriptRoot\ssl-renew.ps1' -Command renew }`""
            exit 1
        }
        $result = Update-SSLCertificate
        if (!$result) {
            exit 1
        }
    }
    "check" {
        $result = Test-CertificateExpiry
        if (!$result) {
            exit 1
        }
    }
    "help" {
    default {
        Write-Host "SSL Certificate Management Script for Windows (PowerShell)"
        Write-Host ""
        Write-Host "Usage: .\ssl-renew.ps1 [-Command] <command>"
        Write-Host ""
        Write-Host "Commands:"
        Write-Host "  issue   - Issue a new SSL certificate (requires admin)"
        Write-Host "  renew   - Renew existing certificate (requires admin)"
        Write-Host "  check   - Check certificate expiry date"
        Write-Host "  help    - Show this help message"
        Write-Host ""
        Write-Host "Domain: $DOMAIN"
        Write-Host "Email: $EMAIL"
        Write-Host ""
        Write-Host "Make sure to:"
        Write-Host "1. Point your domain DNS to this server"
        Write-Host "2. Ensure ports 80 and 443 are open"
        Write-Host "3. Run commands as Administrator"
        Write-Host ""
        Write-Host "Examples:"
        Write-Host "  .\ssl-renew.ps1 -Command issue     # Issue new certificate"
        Write-Host "  .\ssl-renew.ps1 -Command check     # Check expiry"
    }
}
}
