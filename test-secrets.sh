#!/bin/bash

# Test script for secret generation
# Run this to verify the generate_secret function works

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" >&2
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

log "Testing secret generation..."

# Test secret generation
SECRET1=$(generate_secret)
SECRET2=$(generate_secret)

if [[ -z "$SECRET1" ]]; then
    error "Failed to generate first secret"
    exit 1
fi

if [[ -z "$SECRET2" ]]; then
    error "Failed to generate second secret"
    exit 1
fi

if [[ "$SECRET1" == "$SECRET2" ]]; then
    error "Generated secrets are identical - this should not happen!"
    exit 1
fi

if [[ ${#SECRET1} -ne 64 ]]; then
    error "First secret length is ${#SECRET1}, expected 64"
    exit 1
fi

if [[ ${#SECRET2} -ne 64 ]]; then
    error "Second secret length is ${#SECRET2}, expected 64"
    exit 1
fi

log "✅ Secret generation test passed!"
log "Secret 1: ${SECRET1:0:16}..."
log "Secret 2: ${SECRET2:0:16}..."
log "Both secrets are 64 characters long and unique"
