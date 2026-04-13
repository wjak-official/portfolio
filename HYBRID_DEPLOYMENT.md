# Hybrid Deployment Guide: GitHub Pages + Docker API

This guide explains how to set up a hybrid deployment where:
- **Static content** (HTML, CSS, JS) is served from **GitHub Pages** on `yourusername.github.io/your-repo`
- **API backend** (Node.js) runs locally in **Docker** on the demo placeholder subdomain `api.example.com`

> `api.example.com` is a reserved example hostname used for documentation and demo purposes. Replace it with your real API hostname before deploying a live system.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│   GitHub Pages  │    │   Docker API    │
│                 │    │                 │
│ yourusername    │────│ api.example.com │
│ .github.io/your-repo │    │                 │
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
   nslookup api.example.com

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
curl -I http://api.example.com

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

The static assets now use demo-friendly placeholders:
- `main.js`: `fetch('https://api.example.com/api/csrf-token')`
- `contact-form.js`: demo-only preview logic with no live API submission

### 3. Deploy to GitHub Pages

```bash
# Commit and push changes
git add .
git commit -m "Update API calls to use the demo placeholder api.example.com"
git push origin main
```

## 🧪 Testing the Hybrid Setup

### 1. Test Static Site
```bash
# Should load from GitHub Pages
curl -I https://yourusername.github.io/your-repo
# Response: HTTP/2 200 (from GitHub)
```

### 2. Test API Backend
```bash
# Should reach your local Docker
curl -I https://api.example.com/api/health
# Response: HTTP/2 200 (from your local Docker)
```

### 3. Test CORS
```bash
# Test from GitHub Pages domain to API
curl -X OPTIONS -H "Origin: https://yourusername.github.io/your-repo" \
     https://api.example.com/api/csrf-token
# Should return CORS headers allowing the origin
```

### 4. Test Contact Form
1. **Open the contact form** at `https://yourusername.github.io/your-repo/contact.html`
2. **Fill out the form** with test data and solve the math challenge.Try to input wrong answer to see the validation in action, you can also try to input incorrect formats in other fields and see how the form handles it.
3. **Submit** - in a live deployment this would call `https://api.example.com/api/contact`
4. **Check backend behavior** - in a live deployment, confirm the submission is processed as expected

## 🔧 Troubleshooting

### DNS Issues
```bash
# Check DNS resolution
nslookup api.example.com

# Check if ports are open externally
telnet api.example.com 80
telnet api.example.com 443
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
curl -H "Origin: https://yourusername.github.io/your-repo" \
     -v https://api.example.com/api/csrf-token
```

### SSL Issues
```bash
# Check SSL certificate
openssl s_client -connect api.example.com:443 -servername api.example.com

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
curl https://api.example.com/api/health

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

## 🔐 Security Baseline for the Hybrid Architecture

### GitHub Pages header limitations

GitHub Pages does **not** apply custom HTTP response headers from repository files.
The `_headers` file in this repository is only honoured when the site is served through
a CDN/proxy layer that supports the Netlify / Cloudflare Pages `_headers` convention.

For pure GitHub Pages, the `<meta http-equiv="Content-Security-Policy">` tags in each
HTML page provide a partial, client-side CSP mitigation. The following headers **cannot**
be set client-side and require an edge/proxy layer:

- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy` (as a real header)
- `Permissions-Policy`| HTTPS on both domains | TLS at Nginx / Cloudflare for `api.*`; GitHub enforces HTTPS for Pages |
| CORS allowlist | Set `ALLOWED_ORIGINS=https://yourusername.github.io/your-repo` in `.env` |
| CSRF cookies | The CSRF cookie is set to `SameSite=None; Secure` in `server.js`; frontend fetches use `credentials: 'include'` |
| API `Access-Control-Allow-Credentials` | Automatically set by the CORS config when origin matches |
| HSTS | Set `HSTS_MAX_AGE=31536000`, `HSTS_INCLUDE_SUBDOMAINS=true` in `.env` |
- `frame-ancestors` directive in CSP (only works as a real HTTP header)

### Required setup for the hybrid static + API architecture

| Requirement | Action |
|-------------|--------|


### Security verification commands

```bash
# 1. Verify CSRF token flow
#    The response must set a Set-Cookie header alongside the JSON token.
curl -c /tmp/csrf_cookies.txt -sv https://api.example.com/api/csrf-token 2>&1 \
  | grep -E 'csrfToken|set-cookie|< HTTP'

# 2. Submit a valid contact request (uses the cookie from step 1; requires jq)
TOKEN=$(curl -c /tmp/csrf_cookies.txt -s https://api.example.com/api/csrf-token \
  | jq -r '.csrfToken')
curl -b /tmp/csrf_cookies.txt -s -X POST https://api.example.com/api/contact \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{"name":"Test User","email":"test@example.com","subject":"general","message":"Integration test message","challenge_a":3,"challenge_b":4,"challenge_answer":7}'

# 3. Verify CORS preflight is accepted for the Pages origin
curl -sv -X OPTIONS https://api.example.com/api/csrf-token \
  -H "Origin: https://yourusername.github.io/your-repo" \
  -H "Access-Control-Request-Method: GET" 2>&1 \
  | grep -i 'access-control'

# 4. Check HTTP security headers on the API (Helmet-managed)
curl -sI https://api.example.com/api/health \
  | grep -iE 'x-frame|x-content-type|strict-transport|content-security|referrer'

# 5. Verify frame protection on the static site
#    (Only meaningful when served through a layer that applies _headers)
curl -sI https://yourusername.github.io/your-repo | grep -i 'x-frame\|frame-ancestors'

# 6. Check HSTS on the API
curl -sI https://api.example.com | grep -i strict-transport

# 7. Confirm CSRF rejection works (submit without a valid token — should get 403)
curl -s -X POST https://api.example.com/api/contact \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: invalid-token" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Should be rejected"}' \
  | python3 -m json.tool
# Expected: {"success":false,"message":"Invalid CSRF token..."}
```

## 🚀 Next Steps

1. **Test thoroughly** - Ensure contact form works end-to-end
2. **Monitor logs** - Check for any CORS or API errors
3. **Set up monitoring** - Consider adding uptime monitoring
4. **Consider production migration** - Move API to cloud for better reliability

---

**Need help?** Check the logs and test each component individually. The hybrid approach gives you the best of both worlds! 🎉
