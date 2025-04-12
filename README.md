# Broken IP-Based Brute Force Protection

This is a Node.js app that simulates a broken IP-based brute force protection.  
The app allows login attempts and blocks IP after 3 failed tries — but can be bypassed using X-Forwarded-For.

## How to Run

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file with:
   PORT=3000
4. Run the app:
   node app.js
5. Visit `http://localhost:3000/login`

## Default Credentials
Username: admin  
Password: admin123
