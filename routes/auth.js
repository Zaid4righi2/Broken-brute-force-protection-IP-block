const express = require('express');
const router = express.Router();

const validAccounts = [
  { username: "zaid", password: "righi" },
  { username: "aymen", password: "aissat" }
];

const loginAttempts = {};
const blockedIPs = new Set();

router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Login attempt from IP: ${ip}`);

  // إذا كان الـ IP محظور
  if (blockedIPs.has(ip)) {
    return res.status(403).send(`🚫 تم حظر عنوان IP (${ip}) بسبب محاولات فاشلة متكررة.`);
  }

  // التحقق من الحسابات الصحيحة
  const user = validAccounts.find(
    (account) => account.username === username && account.password === password
  );

  if (user) {
    req.session.loggedIn = true;
    return res.send(`<h2>✅ مرحبًا بك، ${username}!</h2>`);
  } else {
    // زيادة عدد المحاولات لهذا الـ IP
    loginAttempts[ip] = (loginAttempts[ip] || 0) + 1;

    // حظر الـ IP بعد 3 محاولات
    if (loginAttempts[ip] >= 3) {
      blockedIPs.add(ip);
    }

    return res.render('login', { message: '❌ اسم المستخدم أو كلمة المرور غير صحيحة.' });
  }
});

module.exports = router;

