const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { doubleCsrf } = require('csurf-csrf');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
            connectSrc: ["'self'"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ?
    process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) :
    ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CSRF protection setup
const {
    doubleCsrfProtection,
    generateToken
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'fallback-secret-change-in-production',
    cookieName: 'csrf-token',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS']
});

// Rate limiting
const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: 'Too many contact form submissions, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', generalLimiter);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Email transporter
let transporter;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
}

// API Routes

// Get CSRF token
app.get('/api/csrf-token', (req, res) => {
    const token = generateToken(req, res);
    res.json({ csrfToken: token });
});

// Contact form submission with enhanced validation
app.post('/api/contact',
    contactLimiter,
    doubleCsrfProtection,
    [
        body('name')
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Name must be between 2 and 100 characters')
            .matches(/^[a-zA-Z\s\-'\.]+$/)
            .withMessage('Name contains invalid characters')
            .escape(),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address')
            .normalizeEmail()
            .isLength({ max: 254 })
            .withMessage('Email is too long')
            .custom((email) => {
                // Check for disposable email domains
                const disposableDomains = [
                    '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
                    'temp-mail.org', 'throwaway.email', 'yopmail.com',
                    'maildrop.cc', 'tempail.com', 'dispostable.com'
                ];
                const domain = email.split('@')[1]?.toLowerCase();
                if (disposableDomains.includes(domain)) {
                    throw new Error('Disposable email addresses are not allowed');
                }
                return true;
            }),
        body('subject')
            .trim()
            .isLength({ min: 1, max: 200 })
            .withMessage('Subject must be between 1 and 200 characters')
            .escape(),
        body('message')
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage('Message must be between 10 and 1000 characters')
            .escape()
    ],
    async (req, res) => {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { name, email, subject, message } = req.body;

            // Additional server-side validation
            if (!name || !email || !subject || !message) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            // Check for suspicious patterns
            const suspiciousPatterns = [
                /<script/i,
                /javascript:/i,
                /on\w+\s*=/i,
                /<iframe/i,
                /<object/i,
                /<embed/i
            ];

            const combinedInput = `${name} ${email} ${subject} ${message}`;
            for (const pattern of suspiciousPatterns) {
                if (pattern.test(combinedInput)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid input detected'
                    });
                }
            }

            // Send email if transporter is configured
            if (transporter) {
                const mailOptions = {
                    from: process.env.SMTP_FROM || process.env.SMTP_USER,
                    to: process.env.SMTP_USER,
                    subject: `Portfolio Contact: ${subject}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333;">New Contact Form Submission</h2>
                            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Subject:</strong> ${subject}</p>
                                <p><strong>Message:</strong></p>
                                <div style="background: white; padding: 15px; border-radius: 3px; border-left: 4px solid #007bff;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                            <p style="color: #666; font-size: 12px; margin-top: 20px;">
                                This message was sent from the portfolio contact form.
                            </p>
                        </div>
                    `,
                    replyTo: email
                };

                await transporter.sendMail(mailOptions);
            }

            // Log the submission (in production, you might want to store in database)
            console.log(`Contact form submission from ${name} <${email}>: ${subject}`);

            res.json({
                success: true,
                message: 'Thank you for your message! I will get back to you within 24 hours.'
            });

        } catch (error) {
            console.error('Contact form error:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred while processing your message. Please try again later.'
            });
        }
    }
);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            success: false,
            message: 'Invalid CSRF token. Please refresh the page and try again.'
        });
    }

    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'Origin not allowed'
        });
    }

    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'An unexpected error occurred'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📧 Email service: ${transporter ? 'configured' : 'not configured'}`);
    console.log(`🔒 CSRF protection: enabled`);
    console.log(`🛡️  Rate limiting: enabled`);
});

module.exports = app;
