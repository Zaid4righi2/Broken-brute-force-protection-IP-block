const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false }));


const authRouter = require('./routes/auth');
app.use('/', authRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
