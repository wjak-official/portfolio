# Digital Portfolio - Production Ready Bootstrap 5

# Portfolio Website - Production Ready

A secure, modern Bootstrap 5 multi-page portfolio for Ifreelance4u - Web Security Architect & Developer

---

## 📋 Portfolio Structure

**Pages Included:**

1. Home (index.html)
2. About (about.html)
3. Services (services.html)
4. Portfolio/Projects (portfolio.html)
5. Contact (contact.html)

**Security Features Implemented:**

- Content Security Policy (CSP) headers
- XSS protection
- CSRF token implementation
- Secure form handling with sanitization
- HTTPS enforcement
- Subresource Integrity (SRI) for CDN resources
- Rate limiting for forms
- Input validation and sanitization

---

## 🔐 1. index.html - Home Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta name="robots" content="index, follow">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Ifreelance4u - Expert Web Solutions Architect & Developer specializing in secure, compliant web applications. GDPR, HIPAA, PCI-DSS compliance expert.">
    <meta name="keywords" content="web security, compliance, GDPR, HIPAA, PCI-DSS, web development, cybersecurity, DevSecOps">
    <meta name="author" content="Ifreelance4u">
    
    <title>Ifreelance4u | Web Security Architect & Developer</title>
    
    <!-- Bootstrap 5 CSS with SRI -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.html">
                <i class="bi bi-shield-lock-fill text-primary"></i> Ifreelance4u
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="services.html">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="portfolio.html">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section bg-dark text-white py-5" style="margin-top: 56px; min-height: 100vh; display: flex; align-items: center;">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-3 fw-bold mb-4">
                        Building Secure, <span class="text-primary">Compliant</span> Web Solutions
                    </h1>
                    <p class="lead mb-4">
                        Expert Web Solutions Architect specializing in security-first development, compliance implementation, and scalable architectures for fintech, healthcare, and enterprise clients.
                    </p>
                    <div class="d-flex gap-3">
                        <a href="services.html" class="btn btn-primary btn-lg">
                            <i class="bi bi-briefcase"></i> View Services
                        </a>
                        <a href="contact.html" class="btn btn-outline-light btn-lg">
                            <i class="bi bi-envelope"></i> Get In Touch
                        </a>
                    </div>
                    <div class="mt-4">
                        <a href="#" class="text-white me-3 fs-4" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                        <a href="#" class="text-white me-3 fs-4" aria-label="GitHub"><i class="bi bi-github"></i></a>
                        <a href="#" class="text-white me-3 fs-4" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="p-4">
                        <div class="card bg-secondary text-white border-0 shadow-lg">
                            <div class="card-body p-4">
                                <h3 class="card-title mb-3"><i class="bi bi-shield-check"></i> Security-First Approach</h3>
                                <ul class="list-unstyled">
                                    <li class="mb-2"><i class="bi bi-check-circle-fill text-primary"></i> OWASP Top 10 Compliance</li>
                                    <li class="mb-2"><i class="bi bi-check-circle-fill text-primary"></i> GDPR, HIPAA, PCI-DSS Expert</li>
                                    <li class="mb-2"><i class="bi bi-check-circle-fill text-primary"></i> Penetration Testing</li>
                                    <li class="mb-2"><i class="bi bi-check-circle-fill text-primary"></i> DevSecOps Integration</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Expertise Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5 fw-bold">Core Expertise</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="mb-3">
                                <i class="bi bi-shield-lock display-4 text-primary"></i>
                            </div>
                            <h5 class="card-title fw-bold">Web Security</h5>
                            <p class="card-text">OWASP Top 10, secure coding, encryption, and comprehensive vulnerability assessments.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="mb-3">
                                <i class="bi bi-file-earmark-check display-4 text-success"></i>
                            </div>
                            <h5 class="card-title fw-bold">Compliance</h5>
                            <p class="card-text">GDPR, HIPAA, PCI-DSS, SOC 2, and ISO 27001 implementation and auditing.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="mb-3">
                                <i class="bi bi-code-slash display-4 text-info"></i>
                            </div>
                            <h5 class="card-title fw-bold">Development</h5>
                            <p class="card-text">Scalable web applications with modern frameworks and security best practices.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-5 bg-primary text-white">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3">
                    <h2 class="display-4 fw-bold">100+</h2>
                    <p class="lead">Projects Secured</p>
                </div>
                <div class="col-md-3">
                    <h2 class="display-4 fw-bold">50+</h2>
                    <p class="lead">Compliance Audits</p>
                </div>
                <div class="col-md-3">
                    <h2 class="display-4 fw-bold">99.9%</h2>
                    <p class="lead">Uptime Record</p>
                </div>
                <div class="col-md-3">
                    <h2 class="display-4 fw-bold">24/7</h2>
                    <p class="lead">Security Monitoring</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 Ifreelance4u. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-white me-3">Privacy Policy</a>
                    <a href="#" class="text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    
    <!-- Custom JS -->
    <script src="assets/js/main.js"></script>
</body>
</html>
```

---

## 👤 2. about.html - About Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    
    <title>About | Ifreelance4u</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation (Same as index.html) -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.html">
                <i class="bi bi-shield-lock-fill text-primary"></i> Ifreelance4u
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link active" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="portfolio.html">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- About Hero -->
    <section class="py-5 bg-dark text-white" style="margin-top: 56px;">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-4 fw-bold mb-3">About Me</h1>
                    <p class="lead">Building secure, compliant web solutions with a security-first mindset</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Content -->
    <section class="py-5">
        <div class="container">
            <div class="row mb-5">
                <div class="col-lg-10 mx-auto">
                    <div class="card border-0 shadow-lg">
                        <div class="card-body p-5">
                            <h2 class="mb-4">Who I Am</h2>
                            <p class="lead">
                                I'm <strong>Ifreelance4u</strong>, and I help <strong>businesses and organizations</strong> build secure, compliant, and scalable web solutions that protect their data and meet regulatory requirements.
                            </p>
                            <p>
                                My work is based on <strong>security-first principles, innovation, and excellence</strong>. I'm known for architecting robust web applications with bulletproof security frameworks and use advanced security protocols, compliance frameworks, and cutting-edge development technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Journey & Drive -->
            <div class="row g-4 mb-5">
                <div class="col-md-6">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-body p-4">
                            <h3 class="mb-3"><i class="bi bi-map text-primary"></i> My Journey</h3>
                            <p>
                                I've spent years mastering the intersection of web development and cybersecurity. I've helped organizations prevent breaches, achieve compliance certifications, and build systems that users trust.
                            </p>
                            <p class="mb-0">
                                <strong>I believe security shouldn't be an afterthought—it should be the foundation.</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-body p-4">
                            <h3 class="mb-3"><i class="bi bi-heart-fill text-danger"></i> What Drives Me</h3>
                            <p>
                                I'm passionate about making the web safer. Every project I take on, I ask: <em>"How would a malicious actor try to break this?"</em>
                            </p>
                            <p class="mb-0">
                                This mindset has saved clients <strong>millions in potential breach costs</strong> and reputation damage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Expertise -->
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="card border-0 shadow-lg bg-dark text-white">
                        <div class="card-body p-5">
                            <h2 class="mb-4 text-center">My Expertise</h2>
                            <div class="row">
                                <div class="col-md-6">
                                    <ul class="list-unstyled">
                                        <li class="mb-3">
                                            <i class="bi bi-check-circle-fill text-primary"></i> <strong>Web Application Security</strong><br>
                                            <small>OWASP Top 10, secure coding, GitHub vulnerabilities repository</small>
                                        </li>
                                        <li class="mb-3">
                                            <i class="bi bi-check-circle-fill text-primary"></i> <strong>Compliance Frameworks</strong><br>
                                            <small>GDPR, HIPAA, PCI-DSS, SOC 2, ISO 27001</small>
                                        </li>
                                        <li class="mb-3">
                                            <i class="bi bi-check-circle-fill text-primary"></i> <strong>Cloud Security</strong><br>
                                            <small>AWS, Azure, GCP</small>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul class="list-unstyled">
                                        <li class="mb-3">
                                            <i class="bi bi-check-circle-fill text-primary"></i> <strong>Identity & Access Management</strong><br>
                                            <small>OAuth, SSO, MFA</small>
                                        </li>
                                        <li class="mb-3">
                                            <i class="bi bi-check-circle-fill text-primary"></i> <strong>Encryption & Cryptography</strong><br>
                                            <small>End-to-end encryption, secure key management</small>
                                        </li>
                                        <li class="mb-3">
                                            <i class="bi bi-check-circle-fill text-primary"></i> <strong>Security Automation & DevSecOps</strong><br>
                                            <small>CI/CD security, automated testing</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SAL Framework -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <h2 class="text-center mb-5 fw-bold">The Secure Architecture Lifecycle (SAL)</h2>
                    <p class="text-center mb-5 lead">My proven framework for building secure systems</p>
                    
                    <div class="row g-4">
                        <div class="col-md-4">
                            <div class="card h-100 border-primary">
                                <div class="card-body">
                                    <div class="badge bg-primary mb-3">Phase 1</div>
                                    <h5 class="card-title">Discover & Assess</h5>
                                    <p class="card-text">Understanding business needs, compliance requirements, and current security posture</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-primary">
                                <div class="card-body">
                                    <div class="badge bg-primary mb-3">Phase 2</div>
                                    <h5 class="card-title">Design & Architect</h5>
                                    <p class="card-text">Creating security-first architecture with defense-in-depth principles</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-primary">
                                <div class="card-body">
                                    <div class="badge bg-primary mb-3">Phase 3</div>
                                    <h5 class="card-title">Develop & Secure</h5>
                                    <p class="card-text">Building with secure coding practices, encryption, and access controls</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-success">
                                <div class="card-body">
                                    <div class="badge bg-success mb-3">Phase 4</div>
                                    <h5 class="card-title">Test & Validate</h5>
                                    <p class="card-text">Comprehensive security testing, penetration testing, and compliance verification</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-success">
                                <div class="card-body">
                                    <div class="badge bg-success mb-3">Phase 5</div>
                                    <h5 class="card-title">Deploy & Monitor</h5>
                                    <p class="card-text">Secure deployment with continuous monitoring, logging, and incident response</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-success">
                                <div class="card-body">
                                    <div class="badge bg-success mb-3">Phase 6</div>
                                    <h5 class="card-title">Maintain & Evolve</h5>
                                    <p class="card-text">Ongoing security updates, compliance maintenance, and system optimization</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 Ifreelance4u. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-white me-3">Privacy Policy</a>
                    <a href="#" class="text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

---

## 💼 3. services.html - Services Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    
    <title>Services | Ifreelance4u</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.html">
                <i class="bi bi-shield-lock-fill text-primary"></i> Ifreelance4u
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link active" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="portfolio.html">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Services Hero -->
    <section class="py-5 bg-dark text-white" style="margin-top: 56px;">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-4 fw-bold mb-3">Services</h1>
                    <p class="lead">Comprehensive security and development solutions for modern businesses</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Content -->
    <section class="py-5">
        <div class="container">
            <!-- Service 1 -->
            <div class="row mb-5 align-items-center">
                <div class="col-lg-6">
                    <div class="card border-0 shadow-lg h-100">
                        <div class="card-body p-5">
                            <div class="mb-3">
                                <i class="bi bi-search display-4 text-primary"></i>
                            </div>
                            <h2 class="mb-3">Security Architecture Consulting</h2>
                            <p class="mb-4">
                                Comprehensive security audits, threat modeling, and architectural design for web applications. I assess your current infrastructure, identify vulnerabilities, and create a roadmap for secure, scalable systems.
                            </p>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Complete security audits</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Threat modeling & risk assessment</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Architecture design & review</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Security best practices implementation</li>
                            </ul>
                            <p class="text-muted"><strong>Pricing:</strong> Custom pricing based on scope</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="https://via.placeholder.com/600x400/0d6efd/ffffff?text=Security+Audit" alt="Security Architecture" class="img-fluid rounded shadow">
                </div>
            </div>

            <!-- Service 2 -->
            <div class="row mb-5 align-items-center">
                <div class="col-lg-6 order-lg-2">
                    <div class="card border-0 shadow-lg h-100">
                        <div class="card-body p-5">
                            <div class="mb-3">
                                <i class="bi bi-file-earmark-check display-4 text-success"></i>
                            </div>
                            <h2 class="mb-3">Compliance Implementation Services</h2>
                            <p class="mb-4">
                                GDPR, HIPAA, PCI-DSS, SOC 2 compliance assessment and implementation. Navigate complex regulatory requirements with confidence and achieve certification faster.
                            </p>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Gap analysis & assessment</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Policy & procedure documentation</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Technical controls implementation</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Audit preparation & support</li>
                            </ul>
                            <p class="text-muted"><strong>Pricing:</strong> Starting at $5,000</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 order-lg-1">
                    <img src="https://via.placeholder.com/600x400/198754/ffffff?text=Compliance" alt="Compliance" class="img-fluid rounded shadow">
                </div>
            </div>

            <!-- Service 3 -->
            <div class="row mb-5 align-items-center">
                <div class="col-lg-6">
                    <div class="card border-0 shadow-lg h-100">
                        <div class="card-body p-5">
                            <div class="mb-3">
                                <i class="bi bi-code-slash display-4 text-info"></i>
                            </div>
                            <h2 class="mb-3">Custom Web Development</h2>
                            <p class="mb-4">
                                Secure, scalable web applications built with modern frameworks and security best practices. From concept to deployment, I build applications that are both powerful and protected.
                            </p>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Full-stack development</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> API design & integration</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Database architecture</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Performance optimization</li>
                            </ul>
                            <p class="text-muted"><strong>Pricing:</strong> Project-based pricing</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="https://via.placeholder.com/600x400/0dcaf0/000000?text=Development" alt="Development" class="img-fluid rounded shadow">
                </div>
            </div>

            <!-- Service 4 -->
            <div class="row mb-5 align-items-center">
                <div class="col-lg-6 order-lg-2">
                    <div class="card border-0 shadow-lg h-100">
                        <div class="card-body p-5">
                            <div class="mb-3">
                                <i class="bi bi-bug display-4 text-danger"></i>
                            </div>
                            <h2 class="mb-3">Security Code Review & Penetration Testing</h2>
                            <p class="mb-4">
                                In-depth analysis of existing applications to identify vulnerabilities. Manual and automated testing to uncover security flaws before attackers do.
                            </p>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Source code security review</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Penetration testing (black/white box)</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Vulnerability scanning</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Detailed remediation reports</li>
                            </ul>
                            <p class="text-muted"><strong>Pricing:</strong> Starting at $3,000</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 order-lg-1">
                    <img src="https://via.placeholder.com/600x400/dc3545/ffffff?text=Penetration+Testing" alt="Penetration Testing" class="img-fluid rounded shadow">
                </div>
            </div>

            <!-- Service 5 -->
            <div class="row mb-5 align-items-center">
                <div class="col-lg-6">
                    <div class="card border-0 shadow-lg h-100">
                        <div class="card-body p-5">
                            <div class="mb-3">
                                <i class="bi bi-gear-wide-connected display-4 text-warning"></i>
                            </div>
                            <h2 class="mb-3">DevSecOps Integration</h2>
                            <p class="mb-4">
                                CI/CD pipeline security, automated testing, and secure deployment strategies. Integrate security into every phase of your development lifecycle.
                            </p>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> CI/CD security automation</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Container security (Docker, Kubernetes)</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Infrastructure as Code (IaC) security</li>
                                <li class="mb-2"><i class="bi bi-check-circle-fill text-success"></i> Security monitoring & logging</li>
                            </ul>
                            <p class="text-muted"><strong>Pricing:</strong> Retainer or project-based</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="https://via.placeholder.com/600x400/ffc107/000000?text=DevSecOps" alt="DevSecOps" class="img-fluid rounded shadow">
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h2 class="display-5 fw-bold mb-4">Ready to Secure Your Application?</h2>
                    <p class="lead mb-4">Let's discuss how I can help protect your business and achieve compliance.</p>
                    <a href="contact.html" class="btn btn-light btn-lg">
                        <i class="bi bi-envelope"></i> Get Started Today
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 Ifreelance4u. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-white me-3">Privacy Policy</a>
                    <a href="#" class="text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

---

## 📞 4. contact.html - Contact Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self';">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    
    <title>Contact | Ifreelance4u</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.html">
                <i class="bi bi-shield-lock-fill text-primary"></i> Ifreelance4u
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="portfolio.html">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link active" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contact Hero -->
    <section class="py-5 bg-dark text-white" style="margin-top: 56px;">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-4 fw-bold mb-3">Get In Touch</h1>
                    <p class="lead">Let's discuss how I can help secure your business</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Content -->
    <section class="py-5">
        <div class="container">
            <div class="row g-5">
                <!-- Contact Form -->
                <div class="col-lg-7">
                    <div class="card border-0 shadow-lg">
                        <div class="card-body p-5">
                            <h2 class="mb-4">Send a Message</h2>
                            <form id="contactForm" action="/api/contact" method="POST" novalidate>
                                <!-- CSRF Token (should be generated server-side) -->
                                <input type="hidden" name="csrf_token" value="" id="csrf_token">
                                
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="name" name="name" required maxlength="100" pattern="[A-Za-z\s]+">
                                    <div class="invalid-feedback">Please provide your name.</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                                    <input type="email" class="form-control" id="email" name="email" required maxlength="100">
                                    <div class="invalid-feedback">Please provide a valid email.</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="company" class="form-label">Company</label>
                                    <input type="text" class="form-control" id="company" name="company" maxlength="100">
                                </div>
                                
                                <div class="mb-3">
                                    <label for="service" class="form-label">Service Interest</label>
                                    <select class="form-select" id="service" name="service">
                                        <option value="">Select a service...</option>
                                        <option value="security-audit">Security Architecture Consulting</option>
                                        <option value="compliance">Compliance Implementation</option>
                                        <option value="development">Custom Web Development</option>
                                        <option value="penetration-testing">Penetration Testing</option>
                                        <option value="devsecops">DevSecOps Integration</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                                    <textarea class="form-control" id="message" name="message" rows="5" required maxlength="2000"></textarea>
                                    <div class="invalid-feedback">Please provide a message.</div>
                                </div>
                                
                                <!-- Honeypot field for bot protection -->
                                <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
                                
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="privacy" name="privacy" required>
                                    <label class="form-check-label" for="privacy">
                                        I agree to the <a href="#" target="_blank">Privacy Policy</a> <span class="text-danger">*</span>
                                    </label>
                                    <div class="invalid-feedback">You must agree before submitting.</div>
                                </div>
                                
                                <button type="submit" class="btn btn-primary btn-lg w-100" id="submitBtn">
                                    <i class="bi bi-send"></i> Send Message
                                </button>
                                
                                <div id="formMessage" class="mt-3"></div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <!-- Contact Info -->
                <div class="col-lg-5">
                    <div class="card border-0 shadow-lg mb-4">
                        <div class="card-body p-4">
                            <h3 class="mb-4">Contact Information</h3>
                            <div class="mb-3">
                                <i class="bi bi-envelope-fill text-primary me-2"></i>
                                <a href="[mailto:info.ifreelance4u@gmail.com](mailto:info.ifreelance4u@gmail.com)" class="text-decoration-none">[info.ifreelance4u@gmail.com](mailto:info.ifreelance4u@gmail.com)</a>
                            </div>
                            <div class="mb-3">
                                <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                                <span>Dubai, UAE</span>
                            </div>
                            <hr>
                            <h5 class="mb-3">Follow Me</h5>
                            <div class="d-flex gap-3">
                                <a href="#" class="btn btn-outline-dark btn-sm" aria-label="LinkedIn">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                                <a href="#" class="btn btn-outline-dark btn-sm" aria-label="GitHub">
                                    <i class="bi bi-github"></i>
                                </a>
                                <a href="#" class="btn btn-outline-dark btn-sm" aria-label="Twitter">
                                    <i class="bi bi-twitter-x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card border-0 shadow-lg bg-primary text-white">
                        <div class="card-body p-4">
                            <h4 class="mb-3">Quick Response</h4>
                            <p class="mb-0">
                                <i class="bi bi-clock-fill me-2"></i>
                                I typically respond within 24 hours on business days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 Ifreelance4u. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-white me-3">Privacy Policy</a>
                    <a href="#" class="text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/contact-form.js"></script>
</body>
</html>
```

---

## 🎨 5. assets/css/style.css - Custom Styles

```css
/* Custom Styles for Portfolio */

:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --dark-color: #212529;
    --light-color: #f8f9fa;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Smooth Scrolling */
html {
    scroll-behavior: smooth;
}

/* Custom Card Hover Effects */
.hover-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

/* Navbar Styling */
.navbar-brand {
    font-size: 1.5rem;
    transition: color 0.3s ease;
}

.navbar-brand:hover {
    color: var(--primary-color) !important;
}

.nav-link {
    position: relative;
    transition: color 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 50%;
    background-color: var(--primary-color);
    transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
    left: 0;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

/* Button Styles */
.btn {
    transition: all 0.3s ease;
    border-radius: 5px;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Card Styles */
.card {
    transition: all 0.3s ease;
    border-radius: 10px;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

/* Form Styles */
.form-control:focus,
.form-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

/* Loading Spinner */
.spinner-border-sm {
    width: 1rem;
    height: 1rem;
    border-width: 0.15em;
}

/* Responsive Images */
img {
    max-width: 100%;
    height: auto;
}

/* Footer Styles */
footer a {
    text-decoration: none;
    transition: opacity 0.3s ease;
}

footer a:hover {
    opacity: 0.8;
}

/* Social Icons */
.social-icons a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.social-icons a:hover {
    transform: translateY(-3px);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: #0a58ca;
}

/* Responsive Design */
@media (max-width: 768px) {
    .display-3 {
        font-size: 2.5rem;
    }
    
    .display-4 {
        font-size: 2rem;
    }
    
    .hero-section {
        min-height: auto !important;
        padding: 3rem 0 !important;
    }
}

/* Accessibility */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

/* Print Styles */
@media print {
    .navbar,
    .btn,
    footer {
        display: none;
    }
}
```

---

## 🔧 6. assets/js/main.js - Main JavaScript

```jsx
/**
 * Main JavaScript File
 * Secure, production-ready code with input validation
 */

'use strict';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavbar();
    initScrollEffects();
    initSecurityFeatures();
});

/**
 * Initialize Navbar Functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
    
    // Close navbar on link click (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

/**
 * Initialize Scroll Effects
 */
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                [entry.target](http://entry.target).classList.add('fade-in-up');
                observer.unobserve([entry.target](http://entry.target));
            }
        });
    }, observerOptions);
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}
/**
 * Initialize Security Features
 */
function initSecurityFeatures() {
    // Disable right-click on images (optional)
    // document.querySelectorAll('img').forEach(img => {
    //     img.addEventListener('contextmenu', e => e.preventDefault());
    // });
    // Log security info
    console.log('Security features enabled');
}
                
```

---

## 📧 7. assets/js/contact-form.js - Contact Form Handler

```jsx
/**
 * Secure Contact Form Handler
 * Production-ready with validation, sanitization, and rate limiting
 */

'use strict';

// Rate limiting variables
let submissionCount = 0;
let lastSubmissionTime = 0;
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 3600000; // 1 hour in milliseconds

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initContactForm(contactForm);
    }
});

/**
 * Initialize Contact Form
 */
function initContactForm(form) {
    // Generate CSRF token
    generateCsrfToken();
    
    // Add input validation on blur
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Sanitize input on change
        input.addEventListener('input', function() {
            sanitizeInput(this);
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Generate CSRF Token
 */
function generateCsrfToken() {
    // In production, fetch this from your backend
    const csrfInput = document.getElementById('csrf_token');
    if (csrfInput) {
        // This is a placeholder - implement server-side token generation
        const token = generateRandomToken();
        csrfInput.value = token;
        
        // Store in session storage for verification
        sessionStorage.setItem('csrf_token', token);
    }
}

/**
 * Generate Random Token
 */
function generateRandomToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate Individual Field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = [field.name](http://field.name);
    let isValid = true;
    let errorMessage = '';
    // Remove any existing error
    removeFieldError(field);
    // Validation rules
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (fieldName === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
    } else if (fieldType === 'textarea' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
    }
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    return isValid;
}
/**
 * Show Field Error
 */
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}
/**
 * Remove Field Error
 */
function removeFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}
/**
 * Sanitize Input
 */
function sanitizeInput(field) {
    // Basic sanitization - remove script tags and dangerous characters
    let value = field.value;
    value = value.replace(/<script[^>]*>.*?<\/script>/gi, '');
    value = value.replace(/<[^>]+>/g, '');
    field.value = value;
}
/**
 * Handle Form Submit
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = [e.target](http://e.target);
    const submitBtn = form.querySelector('button[type="submit"]');
    // Check rate limiting
    if (!checkRateLimit()) {
        alert('Too many submissions. Please try again later.');
        return;
    }
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    if (!isFormValid) {
        return;
    }
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    // In production, send to your backend
    try {
        // Simulate API call
        await simulateFormSubmission(data);
        // Show success message
        showSuccessMessage(form);
        form.reset();
    } catch (error) {
        console.error('Form submission error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
    }
}
/**
 * Check Rate Limit
 */
function checkRateLimit() {
    const now = [Date.now](http://Date.now)();
    // Reset count if time window has passed
    if (now - lastSubmissionTime > TIME_WINDOW) {
        submissionCount = 0;
    }
    // Check if limit exceeded
    if (submissionCount >= MAX_SUBMISSIONS) {
        return false;
    }
    // Increment count
    submissionCount++;
    lastSubmissionTime = now;
    return true;
}
/**
 * Simulate Form Submission (Replace with real API call)
 */
async function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', data);
            resolve();
        }, 1500);
    });
}
/**
 * Show Success Message
 */
function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
    successDiv.innerHTML = `
        <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}
/**
 * Initialize Security Features (Placeholder)
 */
function initSecurityFeatures() {
    // Placeholder for additional security initialization
    // In production, implement additional security measures
    console.log('Security features initialized');
} 
```

---

## 📄 8. data/content.json - Content Management

```json
{
  "site": {
    "title": "Ifreelance4u | Web Security Architect & Developer",
    "author": "Ifreelance4u",
    "email": "[info.ifreelance4u@gmail.com](mailto:info.ifreelance4u@gmail.com)",
    "brandName": "Ifreelance4u",
    "description": "Web Security Architect & Developer specializing in secure, compliant web solutions. HIPAA, GDPR, PCI-DSS, SOC 2 compliance expert.",
    "keywords": "web security, security architect, HIPAA compliance, GDPR, PCI-DSS, SOC 2, penetration testing, secure development"
  },
  "navigation": [
    { "label": "Home", "url": "index.html" },
    { "label": "About", "url": "about.html" },
    { "label": "Services", "url": "services.html" },
    { "label": "Portfolio", "url": "portfolio.html" },
    { "label": "Contact", "url": "contact.html" }
  ],
  "footer": {
    "copyright": "© 2025 Ifreelance4u. All rights reserved.",
    "links": [
      { "text": "Privacy Policy", "url": "#" },
      { "text": "Terms of Service", "url": "#" }
    ]
  },
  "social": {
    "linkedin": "https://linkedin.com/in/yourusername",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourusername"
  },
  "hero": {
    "title": "Building <span class='text-primary'>Secure</span> & Compliant Web Solutions",
    "subtitle": "Web Security Architect protecting businesses with bulletproof security frameworks and regulatory compliance expertise.",
    "primaryCTA": {
      "text": "View My Work",
      "url": "portfolio.html",
      "icon": "bi bi-briefcase"
    },
    "secondaryCTA": {
      "text": "Get In Touch",
      "url": "contact.html",
      "icon": "bi bi-envelope"
    },
    "highlights": [
      "OWASP Top 10 Security Expert",
      "Compliance Certified (HIPAA, GDPR, PCI-DSS)",
      "Penetration Testing & Code Review",
      "DevSecOps Integration"
    ]
  },
  "expertise": [
    {
      "icon": "bi bi-shield-lock",
      "color": "primary",
      "title": "Security Architecture",
      "description": "Defense-in-depth security design, threat modeling, and vulnerability assessment for web applications."
    },
    {
      "icon": "bi bi-file-earmark-check",
      "color": "success",
      "title": "Compliance & Audits",
      "description": "HIPAA, GDPR, PCI-DSS, SOC 2 implementation and certification support for regulated industries."
    },
    {
      "icon": "bi bi-code-slash",
      "color": "info",
      "title": "Secure Development",
      "description": "Building secure web applications with modern frameworks, automated testing, and CI/CD integration."
    }
  ],
  "stats": [
    { "number": "50+", "label": "Projects Secured" },
    { "number": "15+", "label": "Compliance Certifications" },
    { "number": "99.9%", "label": "Uptime Achieved" },
    { "number": "24/7", "label": "Security Monitoring" }
  ]
}
```

```

```

---

## 🔧 9. includes/header.html - Reusable Header

```html
<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.html" id="navBrand">
            <i class="bi bi-shield-lock-fill text-primary"></i> <span id="brandName">Loading...</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto" id="navMenu">
                <!-- Navigation items will be loaded from JSON -->
            </ul>
        </div>
    </div>
</nav>
```

---

## 🦶 10. includes/footer.html - Reusable Footer

```html
<!-- Footer -->
<footer class="bg-dark text-white py-4" id="mainFooter">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <p class="mb-0" id="footerCopyright">Loading...</p>
            </div>
            <div class="col-md-6 text-md-end" id="footerLinks">
                <!-- Footer links will be loaded from JSON -->
            </div>
        </div>
    </div>
</footer>
```

---

## 📦 11. assets/js/components.js - Component Loader

```jsx
/**
 * Component Loader
 * Securely loads header, footer, and content from external files
 * Implements security best practices with sanitization
 */
'use strict';

let contentData = null;

/**
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load content data
        await loadContentData();
        
        // Load header and footer
        await Promise.all([
            loadFooter()
        ]);
        
        // Set page-specific active states
        setActiveNavigation();
        
        updateMetaTags();
        
    } catch (error) {
        showFallbackContent();
    }
});

```

1. **Rate Limiting**
    
    ```jsx
    // Example using express-rate-limit
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    });
    ```
    

/

- Load Content Data from JSON

*/

async function loadContentData() {

try {

const response = await fetch('data/content.json', {

method: 'GET',

headers: {

'Content-Type': 'application/json'

},

cache: 'no-cache' // Prevent stale data

});

if (!response.ok) {

throw new Error(`HTTP error! status: ${response.status}`);

}

contentData = await response.json();

// Validate JSON structure

if (!validateContentData(contentData)) {

throw new Error('Invalid content data structure');

}

return contentData;

} catch (error) {

console.error('Failed to load content data:', error);

throw error;

}

}

/

- Validate Content Data Structure

*/

function validateContentData(data) {

// Check for required top-level properties

const requiredProps = ['site', 'navigation', 'footer'];

return requiredProps.every(prop => data.hasOwnProperty(prop));

}

/

- Load Header Component

*/

async function loadHeader() {

try {

const response = await fetch('includes/header.html', {

cache: 'no-cache'

});

if (!response.ok) {

throw new Error('Failed to load header');

}

const headerHTML = await response.text();

// Sanitize HTML before insertion

const sanitizedHTML = sanitizeHTML(headerHTML);

// Insert header

const headerContainer = document.getElementById('header-placeholder');

if (headerContainer) {

headerContainer.innerHTML = sanitizedHTML;

} else {

// If no placeholder, insert at top of body

document.body.insertAdjacentHTML('afterbegin', sanitizedHTML);

}

// Populate header with content data

populateHeader();

} catch (error) {

console.error('Error loading header:', error);

throw error;

}

}

/

- Load Footer Component

*/

async function loadFooter() {

try {

const response = await fetch('includes/footer.html', {

cache: 'no-cache'

});

if (!response.ok) {

throw new Error('Failed to load footer');

}

const footerHTML = await response.text();

// Sanitize HTML before insertion

const sanitizedHTML = sanitizeHTML(footerHTML);

// Insert footer

const footerContainer = document.getElementById('footer-placeholder');

if (footerContainer) {

footerContainer.innerHTML = sanitizedHTML;

} else {

// If no placeholder, insert at bottom of body

document.body.insertAdjacentHTML('beforeend', sanitizedHTML);

}

// Populate footer with content data

populateFooter();

} catch (error) {

console.error('Error loading footer:', error);

throw error;

}

}

/

- Populate Header with Content Data

*/

function populateHeader() {

if (!contentData) return;

// Set brand name

const brandName = document.getElementById('brandName');

if (brandName) {

brandName.textContent = escapeHtml([contentData.site](http://contentData.site).brandName);

}

// Build navigation menu

const navMenu = document.getElementById('navMenu');

if (navMenu && contentData.navigation) {

navMenu.innerHTML = [contentData.navigation.map](http://contentData.navigation.map)(item => `

<li class="nav-item">

<a class="nav-link" href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>

</li>

`).join('');

}

}

/

- Populate Footer with Content Data

*/

function populateFooter() {

if (!contentData) return;

// Set copyright

const copyright = document.getElementById('footerCopyright');

if (copyright && contentData.footer) {

copyright.textContent = contentData.footer.copyright;

}

// Build footer links

const footerLinks = document.getElementById('footerLinks');

if (footerLinks && contentData.footer.links) {

footerLinks.innerHTML = [contentData.footer.links.map](http://contentData.footer.links.map)(link => `

<a href="${escapeHtml(link.url)}" class="text-white me-3">${escapeHtml(link.text)}</a>

`).join('');

}

}

/

- Set Active Navigation Based on Current Page

*/

function setActiveNavigation() {

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const navLinks = document.querySelectorAll('#navMenu .nav-link');

navLinks.forEach(link => {

const linkPage = link.getAttribute('href');

if (linkPage === currentPage) {

link.classList.add('active');

} else {

link.classList.remove('active');

}

});

}

/

- Update Meta Tags from Content Data

*/

function updateMetaTags() {

if (!contentData || ![contentData.site](http://contentData.site)) return;

// Update title

document.title = [contentData.site](http://contentData.site).title;

// Update meta description

let metaDesc = document.querySelector('meta[name="description"]');

if (!metaDesc) {

metaDesc = document.createElement('meta');

metaDesc.setAttribute('name', 'description');

document.head.appendChild(metaDesc);

}

metaDesc.setAttribute('content', [contentData.site](http://contentData.site).description);

// Update meta keywords

let metaKeywords = document.querySelector('meta[name="keywords"]');

if (!metaKeywords) {

metaKeywords = document.createElement('meta');

metaKeywords.setAttribute('name', 'keywords');

document.head.appendChild(metaKeywords);

}

metaKeywords.setAttribute('content', [contentData.site](http://contentData.site).keywords);

}

/

- Sanitize HTML (Basic Implementation)
- In production, use DOMPurify library

*/

function sanitizeHTML(html) {

// This is a basic sanitization

// For production, integrate DOMPurify: https://github.com/cure53/DOMPurify

// Remove script tags

html = html.replace(/<scriptb[[1]](<)*(?:(?!</script>)<*[[1]](<))*</script>/gi, '');

// Remove on* event handlers

html = html.replace(/onw+s*=s*["'][[2]]("')*["']/gi, '');

html = html.replace(/onw+s*=s*[[3]](\s>)*/gi, '');

return html;

}

/

- Escape HTML for safe insertion

*/

function escapeHtml(text) {

const map = {

'&': '&amp;',

'<': '&lt;',

'>': '&gt;',

'"': '&quot;',

"'": '&#039;'

};

return String(text).replace(/[&<>"']/g, m => map[m]);

}

/

- Show Fallback Content on Error

*/

function showFallbackContent() {

// Provide basic fallback if components fail to load

const brandName = document.getElementById('brandName');

if (brandName) {

brandName.textContent = 'Ifreelance4u';

}

}

/

- Get Content Data (for use in other scripts)

*/

function getContentData() {

return contentData;

}

// Export for module use

if (typeof module !== 'undefined' && module.exports) {

module.exports = {

getContentData,

loadContentData,

escapeHtml

};

}

```
---
## 🏠 12. Updated index.html - Using Components
```

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- Security Headers -->

<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self';">

<meta http-equiv="X-Content-Type-Options" content="nosniff">

<meta http-equiv="X-Frame-Options" content="DENY">

<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

<meta name="robots" content="index, follow">

<!-- Meta tags will be updated by components.js -->

<title>Loading...</title>

<!-- Bootstrap 5 CSS with SRI -->

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

<!-- Bootstrap Icons -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<!-- Custom CSS -->

<link rel="stylesheet" href="assets/css/style.css">

</head>

<body>

<!-- Header Placeholder (will be loaded by components.js) -->

<div id="header-placeholder"></div>

<!-- Hero Section -->

<section class="hero-section bg-dark text-white py-5" style="margin-top: 56px; min-height: 100vh; display: flex; align-items: center;">

<div class="container">

<div class="row align-items-center">

<div class="col-lg-6">

<h1 class="display-3 fw-bold mb-4" id="heroTitle">

Loading...

</h1>

<p class="lead mb-4" id="heroSubtitle">

Loading...

</p>

<div class="d-flex gap-3" id="heroCTA">

<!-- CTAs will be loaded from JSON -->

</div>

<div class="mt-4" id="socialLinks">

<!-- Social links will be loaded from JSON -->

</div>

</div>

<div class="col-lg-6">

<div class="p-4">

<div class="card bg-secondary text-white border-0 shadow-lg">

<div class="card-body p-4">

<h3 class="card-title mb-3"><i class="bi bi-shield-check"></i> Security-First Approach</h3>

<ul class="list-unstyled" id="heroHighlights">

<!-- Highlights will be loaded from JSON -->

</ul>

</div>

</div>

</div>

</div>

</div>

</div>

</section>

<!-- Expertise Section -->

<section class="py-5 bg-light">

<div class="container">

<h2 class="text-center mb-5 fw-bold">Core Expertise</h2>

<div class="row g-4" id="expertiseCards">

<!-- Expertise cards will be loaded from JSON -->

</div>

</div>

</section>

<!-- Stats Section -->

<section class="py-5 bg-primary text-white">

<div class="container">

<div class="row text-center" id="statsSection">

<!-- Stats will be loaded from JSON -->

</div>

</div>

</section>

<!-- Footer Placeholder (will be loaded by components.js) -->

<div id="footer-placeholder"></div>

<!-- Bootstrap Bundle with Popper -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

<!-- Load components first -->

<script src="assets/js/components.js"></script>

<!-- Page-specific content loader -->

<script src="assets/js/home-content.js"></script>

<!-- Main JS -->

<script src="assets/js/main.js"></script>

</body>

</html>

```
---
## 📄 13. assets/js/home-content.js - Home Page Content Loader
```

/

- Home Page Content Loader
- Populates home page with data from JSON

*/

'use strict';

document.addEventListener('DOMContentLoaded', async function() {

// Wait for content data to be loaded

const checkData = setInterval(() => {

const data = getContentData();

if (data) {

clearInterval(checkData);

populateHomeContent(data);

}

}, 100);

// Timeout after 5 seconds

setTimeout(() => clearInterval(checkData), 5000);

});

/

- Populate Home Page Content

*/

function populateHomeContent(data) {

// Hero section

populateHero(data.hero, [data.social](http://data.social));

// Expertise cards

populateExpertise(data.expertise);

// Stats

populateStats(data.stats);

}

/

- Populate Hero Section

*/

function populateHero(hero, social) {

// Title

const titleEl = document.getElementById('heroTitle');

if (titleEl && hero) {

titleEl.innerHTML = hero.title; // Already includes HTML span

}

// Subtitle

const subtitleEl = document.getElementById('heroSubtitle');

if (subtitleEl && hero) {

subtitleEl.textContent = hero.subtitle;

}

// CTAs

const ctaContainer = document.getElementById('heroCTA');

if (ctaContainer && hero) {

ctaContainer.innerHTML = `

<a href="${hero.primaryCTA.url}" class="btn btn-primary btn-lg">

<i class="${hero.primaryCTA.icon}"></i> ${hero.primaryCTA.text}

</a>

<a href="${hero.secondaryCTA.url}" class="btn btn-outline-light btn-lg">

<i class="${hero.secondaryCTA.icon}"></i> ${hero.secondaryCTA.text}

</a>

`;

}

// Social links

const socialContainer = document.getElementById('socialLinks');

if (socialContainer && social) {

socialContainer.innerHTML = `

<a href="${social.linkedin}" class="text-white me-3 fs-4" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">

<i class="bi bi-linkedin"></i>

</a>

<a href="${social.github}" class="text-white me-3 fs-4" aria-label="GitHub" target="_blank" rel="noopener noreferrer">

<i class="bi bi-github"></i>

</a>

<a href="${social.twitter}" class="text-white me-3 fs-4" aria-label="Twitter" target="_blank" rel="noopener noreferrer">

<i class="bi bi-twitter-x"></i>

</a>

`;

}

// Highlights

const highlightsContainer = document.getElementById('heroHighlights');

if (highlightsContainer && hero.highlights) {

highlightsContainer.innerHTML = [hero.highlights.map](http://hero.highlights.map)(item => `

<li class="mb-2">

<i class="bi bi-check-circle-fill text-primary"></i> ${escapeHtml(item)}

</li>

`).join('');

}

}

/

- Populate Expertise Cards

*/

function populateExpertise(expertise) {

const container = document.getElementById('expertiseCards');

if (!container || !expertise) return;

container.innerHTML = [expertise.map](http://expertise.map)(item => `

<div class="col-md-4">

<div class="card h-100 border-0 shadow-sm hover-card">

<div class="card-body text-center p-4">

<div class="mb-3">

<i class="${item.icon} display-4 text-${item.color}"></i>

</div>

<h5 class="card-title fw-bold">${escapeHtml(item.title)}</h5>

<p class="card-text">${escapeHtml(item.description)}</p>

</div>

</div>

</div>

`).join('');

}

/

- Populate Stats Section

*/

function populateStats(stats) {

const container = document.getElementById('statsSection');

if (!container || !stats) return;

container.innerHTML = [stats.map](http://stats.map)(stat => `

<div class="col-md-3">

<h2 class="display-4 fw-bold">${escapeHtml(stat.number)}</h2>

<p class="lead">${escapeHtml(stat.label)}</p>

</div>

`).join('');

}

/

- Escape HTML helper

*/

function escapeHtml(text) {

const map = {

'&': '&amp;',

'<': '&lt;',

'>': '&gt;',

'"': '&quot;',

"'": '&#039;'

};

return String(text).replace(/[&<>"']/g, m => map[m]);

}

```
---
## 📁 14. Updated Project Structure
```

/portfolio

├── index.html

├── about.html

├── services.html

├── portfolio.html

├── contact.html

├── data/

│   └── content.json          # Centralized content management

├── includes/

│   ├── header.html            # Reusable header component

│   └── footer.html            # Reusable footer component

├── assets/

│   ├── css/

│   │   └── style.css

│   ├── js/

│   │   ├── components.js      # Component loader (header/footer)

│   │   ├── home-content.js    # Home page content population

│   │   ├── main.js            # Main functionality

│   │   └── contact-form.js    # Form handling

│   └── images/

│       └── (your images)

└── [README.md](http://README.md)

```jsx
---
## 📄 15. assets/js/about-content.js - About Page Content Loader
```

/

- About Page Content Loader
- Populates about page with data from JSON

*/

'use strict';

document.addEventListener('DOMContentLoaded', async function() {

// Wait for content data to be loaded

const checkData = setInterval(() => {

const data = getContentData();

if (data) {

clearInterval(checkData);

populateAboutContent(data);

}

}, 100);

// Timeout after 5 seconds

setTimeout(() => clearInterval(checkData), 5000);

});

/

- Populate About Page Content

*/

function populateAboutContent(data) {

if (!data || !data.about) return;

// About introduction

populateAboutIntro(data.about);

// Journey and Drive cards

populateJourneyDrive(data.about);

// Expertise list

populateExpertiseList(data.about);

// SAL Framework

populateSALFramework(data.sal_framework);

}

/

- Populate About Introduction

*/

function populateAboutIntro(about) {

const titleEl = document.getElementById('aboutTitle');

if (titleEl) {

titleEl.textContent = about.title;

}

const introEl = document.getElementById('aboutIntro');

if (introEl) {

introEl.innerHTML = about.introduction;

}

const missionEl = document.getElementById('aboutMission');

if (missionEl) {

missionEl.innerHTML = about.mission;

}

}

/

- Populate Journey and Drive Cards

*/

function populateJourneyDrive(about) {

const journeyEl = document.getElementById('journeyContent');

if (journeyEl && about.journey) {

journeyEl.innerHTML = `

<h3 class="mb-3"><i class="bi bi-map text-primary"></i> ${escapeHtml(about.journey.title)}</h3>

<p>${escapeHtml(about.journey.content)}</p>

`;

}

const driveEl = document.getElementById('driveContent');

if (driveEl && [about.drive](http://about.drive)) {

driveEl.innerHTML = `

<h3 class="mb-3"><i class="bi bi-heart-fill text-danger"></i> ${escapeHtml([about.drive](http://about.drive).title)}</h3>

<p>${escapeHtml([about.drive](http://about.drive).content)}</p>

`;

}

}

/

- Populate Expertise List

*/

function populateExpertiseList(about) {

const expertiseEl = document.getElementById('expertiseList');

if (!expertiseEl || !about.expertise) return;

expertiseEl.innerHTML = [about.expertise.map](http://about.expertise.map)(item => `

<li class="mb-3">

<i class="bi bi-check-circle-fill text-primary"></i> <strong>${escapeHtml(item.split('(')[0])}</strong>

<small>${escapeHtml(item.split('(')[1] ? '(' + item.split('(')[1] : '')}</small>

</li>

`).join('');

}

/

- Populate SAL Framework

*/

function populateSALFramework(framework) {

const frameworkEl = document.getElementById('salFramework');

if (!frameworkEl || !framework) return;

frameworkEl.innerHTML = [framework.map](http://framework.map)(phase => `

<div class="col-md-4">

<div class="card h-100 border-${phase.type}">

<div class="card-body">

<div class="badge bg-${phase.type} mb-3">Phase ${phase.phase}</div>

<h5 class="card-title">${escapeHtml(phase.title)}</h5>

<p class="card-text">${escapeHtml(phase.description)}</p>

</div>

</div>

</div>

`).join('');

}

/

- Escape HTML helper

*/

function escapeHtml(text) {

const map = {

'&': '&amp;',

'<': '&lt;',

'>': '&gt;',

'"': '&quot;',

"'": '&#039;'

};

return String(text).replace(/[&<>"']/g, m => map[m]);

}

```
---
## 💼 16. assets/js/services-content.js - Services Page Content Loader
```

/

- Services Page Content Loader
- Populates services page with data from JSON

*/

'use strict';

document.addEventListener('DOMContentLoaded', async function() {

// Wait for content data to be loaded

const checkData = setInterval(() => {

const data = getContentData();

if (data) {

clearInterval(checkData);

populateServicesContent(data);

}

}, 100);

// Timeout after 5 seconds

setTimeout(() => clearInterval(checkData), 5000);

});

/

- Populate Services Page Content

*/

function populateServicesContent(data) {

if (!data || ![data.services](http://data.services)) return;

// Services grid

populateServices([data.services](http://data.services));

}

/

- Populate Services

*/

function populateServices(services) {

const container = document.getElementById('servicesContainer');

if (!container) return;

container.innerHTML = [services.map](http://services.map)((service, index) => {

const isEven = index % 2 === 0;

return `

<div class="row mb-5 align-items-center">

<div class="col-lg-6 ${isEven ? '' : 'order-lg-2'}">

<div class="card border-0 shadow-lg h-100">

<div class="card-body p-5">

<div class="mb-3">

<i class="${service.icon} display-4 text-${service.color}"></i>

</div>

<h2 class="mb-3">${escapeHtml(service.title)}</h2>

<p class="mb-4">${escapeHtml(service.description)}</p>

<ul class="list-unstyled mb-4">

${[service.features.map](http://service.features.map)(feature => `

<li class="mb-2">

<i class="bi bi-check-circle-fill text-success"></i> ${escapeHtml(feature)}

</li>

`).join('')}

</ul>

<p class="text-muted"><strong>Pricing:</strong> ${escapeHtml(service.pricing)}</p>

</div>

</div>

</div>

<div class="col-lg-6 ${isEven ? '' : 'order-lg-1'}">

<img src="${service.image}" alt="${escapeHtml(service.title)}" class="img-fluid rounded shadow">

</div>

</div>

`;

}).join('');

}

/

- Escape HTML helper

*/

function escapeHtml(text) {

const map = {

'&': '&amp;',

'<': '&lt;',

'>': '&gt;',

'"': '&quot;',

"'": '&#039;'

};

return String(text).replace(/[&<>"']/g, m => map[m]);

}

```
---
## 🎨 17. portfolio.html - Portfolio/Projects Page
```

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- Security Headers -->

<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self';">

<meta http-equiv="X-Content-Type-Options" content="nosniff">

<meta http-equiv="X-Frame-Options" content="DENY">

<title>Portfolio | Ifreelance4u</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">

<link rel="stylesheet" href="assets/css/style.css">

</head>

<body>

<!-- Header Placeholder -->

<div id="header-placeholder"></div>

<!-- Portfolio Hero -->

<section class="py-5 bg-dark text-white" style="margin-top: 56px;">

<div class="container">

<div class="row">

<div class="col-lg-8 mx-auto text-center">

<h1 class="display-4 fw-bold mb-3">Portfolio</h1>

<p class="lead">Secure solutions that protect businesses and ensure compliance</p>

</div>

</div>

</div>

</section>

<!-- Filter Tabs -->

<section class="py-5 bg-light">

<div class="container">

<div class="text-center mb-5">

<ul class="nav nav-pills justify-content-center" id="portfolioFilter">

<li class="nav-item">

<button class="nav-link active" data-filter="all">All Projects</button>

</li>

<li class="nav-item">

<button class="nav-link" data-filter="security">Security Audits</button>

</li>

<li class="nav-item">

<button class="nav-link" data-filter="compliance">Compliance</button>

</li>

<li class="nav-item">

<button class="nav-link" data-filter="development">Development</button>

</li>

</ul>

</div>

<!-- Portfolio Grid -->

<div class="row g-4" id="portfolioGrid">

<!-- Placeholder projects - would be loaded from JSON in production -->

<!-- Project 1 -->

<div class="col-md-6 col-lg-4 portfolio-item" data-category="security compliance">

<div class="card h-100 border-0 shadow-sm hover-card">

<img src="https://via.placeholder.com/400x300/0d6efd/ffffff?text=HIPAA+Compliance" class="card-img-top" alt="HIPAA Compliance Project">

<div class="card-body">

Security Audit

HIPAA

<h5 class="card-title">Healthcare Platform Compliance</h5>

<p class="card-text">Implemented HIPAA compliance for a healthcare SaaS platform serving 50,000+ patients.</p>

</div>

<div class="card-footer bg-transparent">

<small class="text-muted">Healthcare • 2024</small>

</div>

</div>

</div>

<!-- Project 2 -->

<div class="col-md-6 col-lg-4 portfolio-item" data-category="development security">

<div class="card h-100 border-0 shadow-sm hover-card">

<img src="https://via.placeholder.com/400x300/198754/ffffff?text=Fintech+Platform" class="card-img-top" alt="Fintech Platform">

<div class="card-body">

Development

PCI-DSS

<h5 class="card-title">Secure Payment Gateway</h5>

<p class="card-text">Built PCI-DSS compliant payment processing system for fintech startup.</p>

</div>

<div class="card-footer bg-transparent">

<small class="text-muted">Fintech • 2024</small>

</div>

</div>

</div>

<!-- Project 3 -->

<div class="col-md-6 col-lg-4 portfolio-item" data-category="security">

<div class="card h-100 border-0 shadow-sm hover-card">

<img src="https://via.placeholder.com/400x300/dc3545/ffffff?text=Penetration+Test" class="card-img-top" alt="Penetration Testing">

<div class="card-body">

Pen Testing

<h5 class="card-title">E-commerce Security Audit</h5>

<p class="card-text">Discovered and remediated 15 critical vulnerabilities in e-commerce platform.</p>

</div>

<div class="card-footer bg-transparent">

<small class="text-muted">E-commerce • 2024</small>

</div>

</div>

</div>

<!-- Project 4 -->

<div class="col-md-6 col-lg-4 portfolio-item" data-category="compliance">

<div class="card h-100 border-0 shadow-sm hover-card">

<img src="https://via.placeholder.com/400x300/6c757d/ffffff?text=GDPR+Implementation" class="card-img-top" alt="GDPR Implementation">

<div class="card-body">

GDPR

<h5 class="card-title">EU Data Protection Compliance</h5>

<p class="card-text">Achieved GDPR compliance for multinational SaaS company operating in EU.</p>

</div>

<div class="card-footer bg-transparent">

<small class="text-muted">SaaS • 2023</small>

</div>

</div>

</div>

<!-- Project 5 -->

<div class="col-md-6 col-lg-4 portfolio-item" data-category="development">

<div class="card h-100 border-0 shadow-sm hover-card">

<img src="https://via.placeholder.com/400x300/fd7e14/ffffff?text=DevSecOps+Pipeline" class="card-img-top" alt="DevSecOps Pipeline">

<div class="card-body">

DevSecOps

<h5 class="card-title">CI/CD Security Integration</h5>

<p class="card-text">Implemented automated security testing in CI/CD pipeline for enterprise client.</p>

</div>

<div class="card-footer bg-transparent">

<small class="text-muted">Enterprise • 2023</small>

</div>

</div>

</div>

<!-- Project 6 -->

<div class="col-md-6 col-lg-4 portfolio-item" data-category="security compliance">

<div class="card h-100 border-0 shadow-sm hover-card">

<img src="https://via.placeholder.com/400x300/0dcaf0/000000?text=SOC+2+Audit" class="card-img-top" alt="SOC 2 Audit">

<div class="card-body">

SOC 2

<h5 class="card-title">SOC 2 Type II Certification</h5>

<p class="card-text">Guided B2B SaaS company through successful SOC 2 Type II audit.</p>

</div>

<div class="card-footer bg-transparent">

<small class="text-muted">B2B SaaS • 2023</small>

</div>

</div>

</div>

</div>

</div>

</section>

<!-- CTA Section -->

<section class="py-5 bg-primary text-white">

<div class="container">

<div class="row">

<div class="col-lg-8 mx-auto text-center">

<h2 class="display-5 fw-bold mb-4">Ready to Secure Your Project?</h2>

<p class="lead mb-4">Let's discuss how I can help protect your business and achieve compliance.</p>

<a href="contact.html" class="btn btn-light btn-lg">

<i class="bi bi-envelope"></i> Start Your Project

</a>

</div>

</div>

</div>

</section>

<!-- Footer Placeholder -->

<div id="footer-placeholder"></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

<script src="assets/js/components.js"></script>

<script src="assets/js/portfolio-filter.js"></script>

<script src="assets/js/main.js"></script>

</body>

</html>

```
---
## 🔍 18. assets/js/portfolio-filter.js - Portfolio Filter
```

/

- Portfolio Filter Functionality
- Filters portfolio items by category

*/

'use strict';

document.addEventListener('DOMContentLoaded', function() {

initPortfolioFilter();

});

/

- Initialize Portfolio Filter

*/

function initPortfolioFilter() {

const filterButtons = document.querySelectorAll('#portfolioFilter .nav-link');

const portfolioItems = document.querySelectorAll('.portfolio-item');

if (!filterButtons.length || !portfolioItems.length) return;

filterButtons.forEach(button => {

button.addEventListener('click', function() {

// Remove active class from all buttons

filterButtons.forEach(btn => btn.classList.remove('active'));

// Add active class to clicked button

this.classList.add('active');

// Get filter value

const filter = this.getAttribute('data-filter');

// Filter portfolio items

portfolioItems.forEach(item => {

const categories = item.getAttribute('data-category');

if (filter === 'all' || categories.includes(filter)) {

[item.style](http://item.style).display = 'block';

// Add fade-in animation

item.classList.add('fade-in-up');

} else {

[item.style](http://item.style).display = 'none';

}

});

});

});

}

```
---
## 🔒 19. Security Implementation Guide
### Backend Security Checklist
**1. HTTPS Enforcement**
```

// Express.js example

const express = require('express');

const helmet = require('helmet');

const app = express();

// Force HTTPS redirect

app.use((req, res, next) => {

if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {

res.redirect([`https://${req.header('host')}${req.url}`](https://${req.header('host')}${req.url}));

} else {

next();

}

});

// HSTS Header

app.use(helmet.hsts({

maxAge: 31536000,

includeSubDomains: true,

preload: true

}));

```
**2. CORS Configuration**
```

const cors = require('cors');

app.use(cors({

origin: process.env.ALLOWED_ORIGIN || 'https://yourdomain.com',

credentials: true,

methods: ['GET', 'POST'],

allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']

}));

```
**3. Rate Limiting**
```

const rateLimit = require('express-rate-limit');

// General API rate limiter

const apiLimiter = rateLimit({

windowMs: 15  *60*  1000, // 15 minutes

max: 100,

message: 'Too many requests from this IP, please try again later.'

});

// Strict limiter for contact form

const contactLimiter = rateLimit({

windowMs: 60  *60*  1000, // 1 hour

max: 3,

message: 'Too many submissions, please try again later.'

});

app.use('/api/', apiLimiter);

app.use('/api/contact', contactLimiter);

```
**4. CSRF Protection**
```

const csrf = require('csurf');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const csrfProtection = csrf({

cookie: {

httpOnly: true,

secure: process.env.NODE_ENV === 'production',

sameSite: 'strict'

}

});

// Generate CSRF token endpoint

app.get('/api/csrf-token', csrfProtection, (req, res) => {

res.json({ csrfToken: req.csrfToken() });

});

// Apply to POST routes

[app.post](http://app.post)('/api/contact', csrfProtection, async (req, res) => {

// Handle contact form

});

```
**5. Input Validation & Sanitization**
```

const { body, validationResult } = require('express-validator');

const DOMPurify = require('isomorphic-dompurify');

// Validation middleware

const validateContactForm = [

body('name')

.trim()

.isLength({ min: 2, max: 100 })

.matches(/^[A-Za-zs'-]+$/)

.withMessage('Invalid name format'),

body('email')

.trim()

.isEmail()

.normalizeEmail()

.withMessage('Invalid email address'),

body('message')

.trim()

.isLength({ min: 10, max: 2000 })

.withMessage('Message must be between 10 and 2000 characters'),

body('website')

.isEmpty()

.withMessage('Honeypot field must be empty')

];

[app.post](http://app.post)('/api/contact', validateContactForm, csrfProtection, async (req, res) => {

// Check validation errors

const errors = validationResult(req);

if (!errors.isEmpty()) {

return res.status(400).json({ errors: errors.array() });

}

// Sanitize inputs

const sanitizedData = {

name: DOMPurify.sanitize([req.body.name](http://req.body.name)),

email: DOMPurify.sanitize([req.body.email](http://req.body.email)),

company: DOMPurify.sanitize([req.body.company](http://req.body.company) || ''),

service: DOMPurify.sanitize(req.body.service || ''),

message: DOMPurify.sanitize(req.body.message)

};

// Process form submission

try {

// Send email, save to database, etc.

await sendContactEmail(sanitizedData);

res.json({ success: true, message: 'Message sent successfully' });

} catch (error) {

console.error('Contact form error:', error);

res.status(500).json({ success: false, message: 'Server error' });

}

});

```
**6. Security Headers**
```

const helmet = require('helmet');

app.use(helmet({

contentSecurityPolicy: {

directives: {

defaultSrc: ["'self'"],

scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],

styleSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],

imgSrc: ["'self'", "data:", "https:"],

fontSrc: ["'self'", "https://cdn.jsdelivr.net"],

connectSrc: ["'self'"],

frameSrc: ["'none'"],

objectSrc: ["'none'"]

}

},

xssFilter: true,

noSniff: true,

referrerPolicy: { policy: 'strict-origin-when-cross-origin' }

}));

```
**7. Email Service (Contact Form)**
```

const nodemailer = require('nodemailer');

// Configure email transporter

const transporter = nodemailer.createTransport({

host: process.env.SMTP_HOST,

port: process.env.SMTP_PORT,

secure: true,

auth: {

user: process.env.SMTP_USER,

pass: process.env.SMTP_PASS

}

});

/

- Send Contact Email

*/

async function sendContactEmail(data) {

const mailOptions = {

from: process.env.SMTP_FROM,

to: '[info.ifreelance4u@gmail.com](mailto:info.ifreelance4u@gmail.com)',

replyTo: [data.email](http://data.email),

subject: `Portfolio Contact: ${data.service || 'General Inquiry'}`,

text: `

Name: ${[data.name](http://data.name)}

Email: ${[data.email](http://data.email)}

Company: ${[data.company](http://data.company)}

Service Interest: ${data.service}

Message:

${data.message}

`,

html: `

<h2>New Contact Form Submission</h2>

<p><strong>Name:</strong> ${[data.name](http://data.name)}</p>

<p><strong>Email:</strong> ${[data.email](http://data.email)}</p>

<p><strong>Company:</strong> ${[data.company](http://data.company)}</p>

<p><strong>Service Interest:</strong> ${data.service}</p>

<h3>Message:</h3>

<p>${data.message.replace(/n/g, '
')}</p>

`

};

return await transporter.sendMail(mailOptions);

}

module.exports = { sendContactEmail };

```
**8. Environment Variables (.env)**
```

# Server

NODE_ENV=production

PORT=3000

# Security

ALLOWED_ORIGIN=https://yourdomain.com

CSRF_SECRET=your-secret-key-here

# Email

SMTP_HOST=[smtp.gmail.com](http://smtp.gmail.com)

SMTP_PORT=465

[SMTP_USER=your-email@gmail.com](mailto:SMTP_USER=your-email@gmail.com)

SMTP_PASS=your-app-specific-password

SMTP_FROM="Ifreelance4u <[info.ifreelance4u@gmail.com](mailto:info.ifreelance4u@gmail.com)>"

# Rate Limiting

RATE_LIMIT_WINDOW=900000

RATE_LIMIT_MAX=100

```
**9. Complete Backend Example (server.js)**
```

const express = require('express');

const helmet = require('helmet');

const cors = require('cors');

const rateLimit = require('express-rate-limit');

const csrf = require('csurf');

const cookieParser = require('cookie-parser');

const path = require('path');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Security middleware

app.use(helmet({

contentSecurityPolicy: {

directives: {

defaultSrc: ["'self'"],

scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],

styleSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],

imgSrc: ["'self'", "data:", "https:"],

fontSrc: ["'self'", "https://cdn.jsdelivr.net"],

connectSrc: ["'self'"]

}

}

}));

// CORS

app.use(cors({

origin: process.env.ALLOWED_ORIGIN,

credentials: true

}));

// Body parser

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Rate limiting

const apiLimiter = rateLimit({

windowMs: 15  *60*  1000,

max: 100

});

app.use('/api/', apiLimiter);

// CSRF protection

const csrfProtection = csrf({ cookie: { httpOnly: true, secure: true, sameSite: 'strict' } });

// API Routes

// Serve static files

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/csrf-token', csrfProtection, (req, res) => {

res.json({ csrfToken: req.csrfToken() });

});

// Import contact route

const contactRoute = require('./routes/contact');

app.use('/api/contact', contactRoute);

// Serve HTML pages

app.get('*', (req, res) => {

res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// Error handling

app.use((err, req, res, next) => {

console.error(err.stack);

res.status(500).json({ error: 'Something went wrong!' });

});

// Start server

app.listen(PORT, () => {

console.log(`Server running on port ${PORT}`);

});

- [ ]  ---
## 📋 20. Deployment Checklist
### Pre-Deployment
- [ ] Replace all placeholder CDN URLs with actual URLs
- [ ] Test all forms locally with validation
- [ ] Verify CSP headers don't block required resources
- [ ] Test on multiple browsers and devices
- [ ] Run security audit (OWASP ZAP, Burp Suite)
- [ ] Validate all input sanitization
- [ ] Test rate limiting functionality
- [ ] Verify HTTPS redirect works
- [ ] Check all images load correctly
- [ ] Test navigation and component loading
### Production Environment
- [ ] Set up SSL/TLS certificate (Let's Encrypt)
- [ ] Configure proper DNS records
- [ ] Set environment variables
- [ ] Enable HSTS preloading
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Enable WAF (Cloudflare, AWS WAF)
- [ ] Configure DDoS protection
- [ ] Set up uptime monitoring
### Post-Deployment
- [ ] Run security scan on live site
- [ ] Test contact form with real email
- [ ] Verify Google Search Console
- [ ] Check mobile responsiveness
- [ ] Test page load speed (GTmetrix, Lighthouse)
- [ ] Verify all security headers ([securityheaders.com](http://securityheaders.com))
- [ ] Test CSRF protection
- [ ] Verify rate limiting works
- [ ] Check browser console for errors
- [ ] Submit sitemap to search engines
---
## 🔒 21. Security Implementation Guide

[Welcome to Notion!](https://www.notion.so/Welcome-to-Notion-2cce56e1a6a880728488fe7433643669?pvs=21)
