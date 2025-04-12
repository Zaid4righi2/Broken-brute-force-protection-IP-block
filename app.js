const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// إعدادات الجلسة
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// إعدادات الإظهار
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// معالجة البيانات القادمة من النماذج
app.use(express.urlencoded({ extended: false }));

// توجيه
const authRouter = require('./routes/auth');
app.use('/', authRouter);

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
