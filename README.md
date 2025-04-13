# 🔐 Broken IP-Based Brute Force Protection (Node.js)

This is a demo application simulating a flawed brute-force protection mechanism based on IP address.  
The server blocks IPs after 3 failed login attempts — but it can be bypassed using the `X-Forwarded-For` header.

## 📂 Project Structure

- `app.js` – Main app file  
- `routes/auth.js` – Authentication logic  
- `views/login.ejs` – Login page  
- `.env` – Configuration file (port, etc.)

---

## 🚀 Getting Started

Follow these steps to run the app locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/broken-ip-protection.git
cd broken-ip-protection
## Default Credentials
Username: zaid  
Password: aymen123   