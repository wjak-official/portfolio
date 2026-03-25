# Ifreelance4u Portfolio

> A production-ready, secure portfolio website for a **Web Security Architect & Developer** — built with Bootstrap 5, Node.js/Express, and Docker.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple.svg)](https://getbootstrap.com/)

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Project Structure](#-project-structure)
4. [Quick Start](#-quick-start)
5. [Backend Setup](#-backend-setup)
6. [Configuration](#-configuration)
7. [Deployment](#-deployment)
8. [Security](#-security)
9. [FAQ](#-faq)
10. [Contributing](#-contributing)
11. [License](#-license)

---

## 🌐 Overview

This is a multi-page portfolio website showcasing web security architecture and development services. It supports two modes:

| Mode | Description | Use case |
|------|-------------|----------|
| **Static** | Pure HTML/CSS/JS served from any web server or GitHub Pages | Simple hosting, CDN, or preview |
| **Full-Stack** | Static frontend + Node.js/Express backend for the contact form API | Production with email functionality |

The hybrid architecture (static frontend + Docker API) is documented in detail in [HYBRID_DEPLOYMENT.md](HYBRID_DEPLOYMENT.md).

---

## ✨ Features

- **5 Responsive Pages** — Home, About, Services, Portfolio, Contact
- **Security-First Design** — CSP headers, XSS protection, CSRF tokens, rate limiting, input sanitization
- **Modern UI** — Bootstrap 5.3.2 with custom CSS animations and hover effects
- **JSON-Driven Content** — All site copy lives in `data/content.json` for easy updates
- **Component System** — Shared header and footer loaded dynamically
- **Accessible** — WCAG-compliant markup, keyboard navigation, screen reader support
- **Docker-Ready** — Dockerfile and Compose config included for containerized deployments
- **SSL Support** — Scripts for self-signed certs (dev) and Let's Encrypt (production)

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Home page
├── about.html              # About page
├── services.html           # Services page
├── portfolio.html          # Portfolio / projects page
├── contact.html            # Contact page with secure form
│
├── data/
│   └── content.json        # Centralized site content (text, links, meta)
│
├── includes/
│   ├── header.html         # Shared navigation component
│   └── footer.html         # Shared footer component
│
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles, CSS variables, animations
│   ├── js/
│   │   ├── main.js         # Core: navbar, utilities, session handling
│   │   ├── components.js   # Loads shared header/footer, sets active nav
│   │   ├── home-content.js          # Home page dynamic content
│   │   ├── about-content.js         # About page dynamic content
│   │   ├── services-content.js      # Services page dynamic content
│   │   ├── portfolio-filter.js      # Portfolio tag/category filtering
│   │   └── contact-form.js          # Form validation, CSRF, honeypot
│   └── images/             # Image assets
│
├── server.js               # Express API (CSRF tokens + contact form email)
├── package.json            # Node.js dependencies
├── Dockerfile              # Container image definition
├── docker-compose.yml      # Production Compose config
├── docker-compose.override.yml  # Local development overrides
├── nginx.conf              # Nginx reverse-proxy config
│
├── deploy                  # Cross-platform deploy entrypoint (auto-detects OS)
├── deploy.sh               # Linux/macOS deployment script
├── deploy.ps1              # Windows PowerShell deployment script
├── deploy.bat              # Windows batch wrapper for deploy.ps1
├── generate-ssl.sh         # Generate self-signed dev certificates
├── ssl-renew.sh            # Let's Encrypt renewal (Linux/macOS)
├── ssl-renew.ps1           # Let's Encrypt renewal (Windows)
│
├── .env.example            # Environment variable template
├── HYBRID_DEPLOYMENT.md    # Deep-dive: GitHub Pages + Docker API setup
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.0.0 (only needed for the backend)
- A modern browser

### Option A — Static frontend only (no Node.js backend)

```bash
# Clone the repo
git clone https://github.com/wjak-official/portfolio.git
cd portfolio

# Serve with any static server, for example:
npx http-server -p 8000        # Node.js
python -m http.server 8000     # Python 3
php -S localhost:8000           # PHP
```

Open `http://localhost:8000` in your browser.

> **Note:** The contact form needs the Node.js backend to send emails. In static-only mode it will display a UI error if submitted.

### Option B — Full-Stack (Node.js + Express)

```bash
git clone https://github.com/wjak-official/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy and fill in the environment file
cp .env.example .env
# Edit .env — at minimum set SMTP_* and the two *_SECRET values

# Start the server
npm start          # production
npm run dev        # development (nodemon auto-reload)
```

Open `http://localhost:3000`.

### Option C — Docker Compose

```bash
git clone https://github.com/wjak-official/portfolio.git
cd portfolio

cp .env.example .env
# Edit .env as described above

docker compose up -d
```

---

## 🖥️ Backend Setup

The Express backend (`server.js`) provides two endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/csrf-token` | GET | Issues a CSRF token for the contact form |
| `/api/contact` | POST | Validates the form and sends an email via Nodemailer |

### Email Configuration

The contact form sends email through any SMTP server. Gmail is supported via App Passwords:

1. Enable 2-Step Verification on your Google account
2. Generate an **App Password** at <https://myaccount.google.com/apppasswords>
3. Set `SMTP_USER` and `SMTP_PASS` in your `.env`

For other providers, adjust `SMTP_HOST` and `SMTP_PORT` accordingly.

---

## ⚙️ Configuration

Copy `.env.example` to `.env` and update the values:

```env
# Server
PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# Security — generate with: openssl rand -hex 32
SESSION_SECRET=<your-32+-char-secret>
CSRF_SECRET=<your-32+-char-secret>

# Email (required for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Your Name <you@gmail.com>"

# CORS — comma-separated list of allowed origins
ALLOWED_ORIGINS=https://your-frontend-domain.com

# Rate limiting
RATE_LIMIT_WINDOW=900000       # 15 min in ms
RATE_LIMIT_MAX=100
CONTACT_RATE_LIMIT_WINDOW=3600000  # 1 hour in ms
CONTACT_RATE_LIMIT_MAX=3

# SSL
FORCE_HTTPS=false              # Set true behind a TLS-terminating proxy
```

### Generating Secrets

```bash
# Requires OpenSSL (available on Linux, macOS, and Git Bash on Windows)
openssl rand -hex 32
```

Run this twice — once for `SESSION_SECRET`, once for `CSRF_SECRET`.

---

## 🚢 Deployment

### Self-Contained Docker (single server)

```bash
# Run the all-in-one deploy entrypoint (detects your OS automatically)
chmod +x deploy
./deploy
```

The script handles building the Docker image, starting the container, and optionally setting up Let's Encrypt SSL.

### Hybrid: GitHub Pages (frontend) + Docker API (backend)

See **[HYBRID_DEPLOYMENT.md](HYBRID_DEPLOYMENT.md)** for the full walkthrough, including:

- DNS setup (Cloudflare)
- CORS configuration between the two domains
- SSL certificate management

### SSL Certificates

| Script | Platform | Purpose |
|--------|----------|---------|
| `generate-ssl.sh` | Linux/macOS | Self-signed cert for local HTTPS dev |
| `ssl-renew.sh` | Linux/macOS | Let's Encrypt issuance & renewal |
| `ssl-renew.ps1` | Windows | Let's Encrypt issuance & renewal |

---

## 🔐 Security

This project applies defence-in-depth at multiple layers:

| Layer | Measures |
|-------|----------|
| **HTTP Headers** | [Helmet.js](https://helmetjs.github.io/) — CSP, HSTS, X-Frame-Options, etc. |
| **CSRF** | Double-submit cookie pattern via `csrf-csrf` |
| **Rate Limiting** | `express-rate-limit` — global (100/15 min) and contact-specific (3/hour) |
| **Input Validation** | `express-validator` — type checks, length limits, email regex |
| **XSS** | DOMPurify on the client; HTML entity encoding on the server |
| **Compression** | `compression` middleware (gzip level 6) |
| **CORS** | Explicit allowlist via `ALLOWED_ORIGINS` env var |
| **Honeypot** | Hidden form field to trap bots |

> Found a security issue? Please open a **private** GitHub issue or email directly rather than disclosing publicly.

---

## ❓ FAQ

**Q: Can I use this without the Node.js backend?**  
A: Yes. All five pages work as pure static HTML. The only feature that requires the backend is the contact form email delivery. You can replace it with a third-party form service (Formspree, Netlify Forms, etc.) if you prefer a fully static setup.

**Q: How do I customise the site content?**  
A: Edit `data/content.json`. All page text, navigation links, social URLs, and metadata are loaded from this file at runtime — no need to touch individual HTML files for copy changes.

**Q: How do I add or remove portfolio projects?**  
A: Add or remove entries in the `portfolio` array inside `data/content.json`. Each project supports `title`, `description`, `category`, `image`, and `link` fields. The filter buttons on the portfolio page are generated automatically from each project's `category` value.

**Q: How do I change the color scheme?**  
A: Open `assets/css/style.css` and edit the CSS custom properties at the top of the file (`:root { ... }`). The primary brand color, accent, and background are all defined there.

**Q: The contact form says "Failed to load CSRF token" in static mode — is that a bug?**  
A: No. Without the Node.js backend running, there is no `/api/csrf-token` endpoint to call. Either run `npm start` / `docker compose up` to enable the full stack, or replace the form with a static-compatible form service.

**Q: How do I enable HTTPS locally?**  
A: Run `bash generate-ssl.sh`. This creates `ssl/cert.pem` and `ssl/key.pem` (self-signed). Then set `FORCE_HTTPS=true` in `.env` and restart the server. Your browser will warn about the self-signed cert — this is expected in development.

**Q: What Node.js version is required?**  
A: Node.js ≥ 18.0.0 and npm ≥ 9.0.0.

**Q: Does this work on Windows?**  
A: Yes. Use `deploy.bat` (or `deploy.ps1` directly in PowerShell) for deployment, and `ssl-renew.ps1` for SSL management. Node.js and Docker Desktop both run on Windows.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

### Getting Started

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Make your changes** — follow the conventions already in the codebase (ES5-compatible JS in strict mode, BEM-ish CSS classes, Bootstrap utility classes preferred over custom CSS where possible).

4. **Test manually** — run `npm run dev` and verify your changes across the five pages and on mobile viewport sizes.

5. **Commit** with a clear, imperative message:
   ```bash
   git commit -m "Add dark-mode toggle to navbar"
   ```

6. **Open a Pull Request** against `main`. Describe what you changed and why.

### What to Contribute

- 🐛 Bug fixes
- ♿ Accessibility improvements
- 🎨 UI/UX enhancements
- 📖 Documentation improvements
- 🔒 Security hardening
- 🌍 Internationalization (i18n) support

### Code Style

- JavaScript: ES5-compatible, strict mode (`'use strict'`), no build step required
- CSS: Custom properties for theming; keep specificity low
- HTML: Semantic elements, ARIA labels where needed

### Reporting Issues

Please include:
- Steps to reproduce
- Expected vs. actual behaviour
- Browser / OS / Node.js version
- Any relevant console errors

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal or commercial purposes with attribution.
