const express = require('express');
const router = express.Router();


const USERNAME = 'zaid';
const PASSWORD = 'aymen123';


const loginAttempts = {};
const blockedIPs = new Set();


router.get('/login', (req, res) => {
  res.render('login', { message: null });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Login attempt from IP: ${ip}`);

  
  if (blockedIPs.has(ip)) {
    return res.status(403).send(`🚫 IP address (${ip}) is blocked due to multiple failed login attempts.`);
  }

  
  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    return res.send(`<h2>✅ Welcome, ${username}!</h2>`);
  } else {
    
    loginAttempts[ip] = (loginAttempts[ip] || 0) + 1;

    if (loginAttempts[ip] >= 3) {
      blockedIPs.add(ip);
    }

    return res.render('login', { message: '❌ Invalid username or password.' });
  }
});

module.exports = router;
