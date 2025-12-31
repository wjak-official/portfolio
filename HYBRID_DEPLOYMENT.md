# Hybrid Deployment Guide: GitHub Pages + Docker API

This guide explains how to set up a hybrid deployment where:
- **Static content** (HTML, CSS, JS) is served from **GitHub Pages** on `uat.ifreelance4u.com`
- **API backend** (Node.js) runs locally in **Docker** on `api.ifreelance4u.com` subdomain

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│   GitHub Pages  │    │   Docker API    │
│                 │    │                 │
│ uat.ifreelance │────│ api.ifreelance  │
│ 4u.com         │    │ 4u.com          │
│                 │    │                 │
│ - Static HTML   │    │ - CSRF tokens   │
│ - CSS/JS        │    │ - Contact form  │
│ - No server     │    │ - Email sending │
└─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- **GitHub Pages** enabled for your repository
- **Cloudflare** account (or other DNS provider)
- **Docker** and **Docker Compose** installed locally
- **Local development machine** that can run 24/7

## 🌐 Step-by-Step DNS Configuration

### 1. Create the API Subdomain in Cloudflare

1. **Log into Cloudflare Dashboard**
   - Go to your Cloudflare account
   - Select your domain (`ifreelance4u.com`)

2. **Add DNS Record for API Subdomain**
   ```
   Type: A
   Name: api
   Content: YOUR_LOCAL_IP_ADDRESS
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

3. **Find Your Local IP Address**
   ```bash
   # Linux/macOS
   curl ifconfig.me

   # Windows PowerShell
   (Invoke-WebRequest -Uri "http://ifconfig.me/ip").Content.Trim()
   ```

4. **Verify DNS Propagation**
   ```bash
   # Test DNS resolution
   nslookup api.ifreelance4u.com

   # Should return your local IP address
   ```

### 2. Configure Port Forwarding

Your router needs to forward external requests on ports 80 and 443 to your local machine.

#### **Router Configuration:**
1. **Access your router admin panel** (usually `192.168.1.1` or `192.168.0.1`)
2. **Find Port Forwarding/NAT settings**
3. **Add these rules:**
   ```
   External Port: 80 → Internal IP: YOUR_LOCAL_IP → Internal Port: 80
   External Port: 443 → Internal IP: YOUR_LOCAL_IP → Internal Port: 443
   ```

#### **Test Port Forwarding:**
```bash
# From external network (not your local network)
curl -I http://api.ifreelance4u.com

# Should reach your local Docker container
```

## 🚀 Local Docker Setup

### 1. Deploy the API Backend

```bash
# Cross-platform deployment (auto-detects OS)
./deploy

# Or platform-specific:

# Linux/macOS
chmod +x deploy.sh
./deploy.sh

# Windows PowerShell
.\deploy.ps1

# Windows Command Prompt
deploy.bat
```

### 2. Configure Email Settings

Edit the generated `.env` file:
```bash
nano .env  # or notepad .env on Windows

# Update these required fields:
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

### 3. Test Local API

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test CSRF token endpoint
curl http://localhost:3000/api/csrf-token
```

### 4. Setup SSL Certificates (Optional for Development)

```bash
# Linux/macOS
sudo ./ssl-renew.sh issue

# Windows (run as Administrator)
.\ssl-renew.ps1 -Command issue
```

## 🔗 GitHub Pages Configuration

### 1. Ensure GitHub Pages is Enabled

1. **Go to Repository Settings**
2. **Scroll to "Pages" section**
3. **Set source to "Deploy from a branch"**
4. **Select branch `main` or `gh-pages`**
5. **Set folder to `/(root)`**

### 2. Update Static Files (Already Done)

The static HTML files have been updated to call the API subdomain:
- `main.js`: `fetch('https://api.ifreelance4u.com/api/csrf-token')`
- `contact-form.js`: `fetch('https://api.ifreelance4u.com/api/contact')`

### 3. Deploy to GitHub Pages

```bash
# Commit and push changes
git add .
git commit -m "Update API calls to use api.ifreelance4u.com subdomain"
git push origin main
```

## 🧪 Testing the Hybrid Setup

### 1. Test Static Site
```bash
# Should load from GitHub Pages
curl -I https://uat.ifreelance4u.com
# Response: HTTP/2 200 (from GitHub)
```

### 2. Test API Backend
```bash
# Should reach your local Docker
curl -I https://api.ifreelance4u.com/api/health
# Response: HTTP/2 200 (from your local Docker)
```

### 3. Test CORS
```bash
# Test from GitHub Pages domain to API
curl -X OPTIONS -H "Origin: https://uat.ifreelance4u.com" \
     https://api.ifreelance4u.com/api/csrf-token
# Should return CORS headers allowing the origin
```

### 4. Test Contact Form
1. **Visit:** `https://uat.ifreelance4u.com`
2. **Fill out contact form**
3. **Submit** - should call `https://api.ifreelance4u.com/api/contact`
4. **Check email** - should receive the contact form submission

## 🔧 Troubleshooting

### DNS Issues
```bash
# Check DNS resolution
nslookup api.ifreelance4u.com

# Check if ports are open externally
telnet api.ifreelance4u.com 80
telnet api.ifreelance4u.com 443
```

### Port Forwarding Issues
```bash
# Check local services
netstat -tlnp | grep :80
netstat -tlnp | grep :443

# Test from local network
curl http://YOUR_LOCAL_IP/api/health
```

### CORS Issues
```bash
# Check CORS headers
curl -H "Origin: https://uat.ifreelance4u.com" \
     -v https://api.ifreelance4u.com/api/csrf-token
```

### SSL Issues
```bash
# Check SSL certificate
openssl s_client -connect api.ifreelance4u.com:443 -servername api.ifreelance4u.com

# Renew certificate if needed
sudo ./ssl-renew.sh renew
```

### PowerShell Execution Issues

If you get errors like `syntax error near unexpected token`, you're running the PowerShell script in bash. Use one of these methods:

#### **Method 1: Use the Cross-Platform Script**
```bash
./deploy  # Auto-detects your OS and runs the right script
```

#### **Method 2: Run PowerShell Directly**
```powershell
# In PowerShell terminal:
.\deploy.ps1

# Or with full path:
powershell.exe -ExecutionPolicy Bypass -File ".\deploy.ps1"
```

#### **Method 3: Use Command Prompt**
```cmd
# In Command Prompt:
deploy.bat
```

#### **Method 4: Check Your Terminal**
Make sure you're running the right command in the right shell:
- **PowerShell scripts (.ps1)** → Run in PowerShell
- **Bash scripts (.sh)** → Run in bash/Git Bash
- **Cross-platform script** → Run `./deploy` in any shell

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Monitor API health
curl https://api.ifreelance4u.com/api/health

# Check Docker containers
docker-compose ps

# View logs
docker-compose logs -f
```

### SSL Certificate Renewal
```bash
# Check expiry
sudo ./ssl-renew.sh check

# Renew if needed
sudo ./ssl-renew.sh renew
```

### Backup Strategy
- **GitHub Pages**: Automatically backed up in Git
- **API Backend**: Backup `.env` file and Docker volumes
- **Database**: If you add one, set up regular backups

## 🎯 Benefits of This Setup

✅ **Fast Static Delivery** - GitHub Pages CDN for HTML/CSS/JS
✅ **Secure API** - Local Docker with full security features
✅ **Cost Effective** - GitHub Pages is free, local server for API
✅ **Development Friendly** - Easy to modify and test locally
✅ **Scalable** - Can move API to cloud later if needed

## 🚀 Next Steps

1. **Test thoroughly** - Ensure contact form works end-to-end
2. **Monitor logs** - Check for any CORS or API errors
3. **Set up monitoring** - Consider adding uptime monitoring
4. **Consider production migration** - Move API to cloud for better reliability

---

**Need help?** Check the logs and test each component individually. The hybrid approach gives you the best of both worlds! 🎉
