import helmet from 'helmet';

// Helmet configuration for comprehensive security headers
export const helmetConfig = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:5173"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  
  // Strict Transport Security (HSTS)
  // Forces HTTPS connections for 1 year
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  
  // X-Frame-Options: Prevents clickjacking
  frameguard: {
    action: 'deny',
  },
  
  // X-Content-Type-Options: Prevents MIME-type sniffing
  noSniff: true,
  
  // X-DNS-Prefetch-Control: Controls DNS prefetching
  dnsPrefetchControl: {
    allow: false,
  },
  
  // Referrer-Policy: Controls referrer information
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  
  // Permissions-Policy: Restricts browser features
  permittedCrossDomainPolicies: {
    permittedPolicies: 'none',
  },
});

export default helmetConfig;
