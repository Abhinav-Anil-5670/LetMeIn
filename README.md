# 🧩 LetMeIn

**LetMeIn** is a full-stack **MERN authentication system** that provides secure user authentication with complete email-based OTP verification and password reset functionality using **Nodemailer** and **Brevo (formerly Sendinblue)**.

Users can:
- Create an account  
- Log in  
- Verify their email address  
- Reset or change their password using an OTP sent to their email  

All verification and authentication details are securely stored in **MongoDB**.

---

## ⚙️ Tech Stack

**Frontend:** React (Vite)  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Email Service:** Nodemailer + Brevo SMTP  
**Auth:** JWT-based Authentication  

---

## 🚀 Features

✅ User Registration and Login  
✅ Email Verification System  
✅ OTP-based Password Reset  
✅ Encrypted Password Storage (bcrypt)  
✅ Secure JWT Session Tokens  
✅ Nodemailer Email Integration  
✅ MongoDB for User and OTP Data  
✅ Environment-Based Configuration  

---

## 🔧 Environment Variables

### **Frontend (.env)**
```
VITE_BACKEND_URL="Enter BackEnd URL"
```

### **Backend (.env)**
```
MONGODB_URL=""
JWT_SECRET=""
NODE_ENV="development"
SMTP_USER=""
SMTP_PASSWORD=""
SENDER_EMAIL=""
```

## Installation and Setup

### Clone the Repository
```
https://github.com/Abhinav-Anil-5670/LetMeIn
```

### Backend Setup
```
cd server
npm install
node server.js
```

### Frontend Setup
```
cd client
npm install
npm run dev
```



