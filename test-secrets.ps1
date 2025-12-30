# Test script for secret generation (PowerShell)
# Run this to verify the secret generation functions work

# Colors for output (PowerShell console colors)
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
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

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "SUCCESS: $Message" $Cyan
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

Write-Log "Testing secret generation..."

# Test secret generation
$secret1 = New-SecureSecret
$secret2 = New-SecureSecret

if ([string]::IsNullOrEmpty($secret1)) {
    Write-Error "Failed to generate first secret"
    exit 1
}

if ([string]::IsNullOrEmpty($secret2)) {
    Write-Error "Failed to generate second secret"
    exit 1
}

if ($secret1 -eq $secret2) {
    Write-Error "Generated secrets are identical - this should not happen!"
    exit 1
}

if ($secret1.Length -ne 64) {
    Write-Error "First secret length is $($secret1.Length), expected 64"
    exit 1
}

if ($secret2.Length -ne 64) {
    Write-Error "Second secret length is $($secret2.Length), expected 64"
    exit 1
}

Write-Success "✅ Secret generation test passed!"
Write-Log "Secret 1: $($secret1.Substring(0,16))..."
Write-Log "Secret 2: $($secret2.Substring(0,16))..."
Write-Log "Both secrets are 64 characters long and unique"
