const express = require('express');
const router = express.Router();

// Correct login credentials
const USERNAME = 'admin';
const PASSWORD = 'admin123';

// Track failed attempts by IP
const loginAttempts = {};
const blockedIPs = new Set();

// Render login page
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// Handle login submission
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Get client IP from X-Forwarded-For header or fallback to real IP
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Login attempt from IP: ${ip}`);

  // Check if the IP is blocked
  if (blockedIPs.has(ip)) {
    return res.status(403).send(`🚫 IP address (${ip}) is blocked due to multiple failed login attempts.`);
  }

  // Check credentials
  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    return res.send(`<h2>✅ Welcome, ${username}!</h2>`);
  } else {
    // Increment failed attempts for this IP
    loginAttempts[ip] = (loginAttempts[ip] || 0) + 1;

    if (loginAttempts[ip] >= 3) {
      blockedIPs.add(ip);
    }

    return res.render('login', { message: '❌ Invalid username or password.' });
  }
});

module.exports = router;
