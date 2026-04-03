# auth-api 🔐

A simple authentication API built with **Node.js, Express, MongoDB (Mongoose), bcryptjs, JWT, and cookie-based authentication**.

---

## 🚀 Features

* User Signup
* User Login → JWT stored in **httpOnly cookie**
* Protected `/profile` route
* Admin-only `/admin/users` route
* Secure Logout (cookie invalidation)

---

## 🧱 Tech Stack

* Node.js
* Express
* MongoDB + Mongoose
* bcryptjs (password hashing)
* JSON Web Token (JWT)
* cookie-parser (cookie handling)
* dotenv (env config)
* express-rate-limit

---

## ⚙️ Setup

### 1. Clone Repo

```bash
git clone https://github.com/sayyedaaman2/auth-api.git
cd auth-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

```env
PORT=9000
MONGO_URI="mongodb://admin:pass@127.0.0.1:27017/auth-api?authSource=admin"
JWT_SECRET="some-long-random-string-here""
JWT_EXPIRES_IN="15m"

JWT_REFRESH_SECRET="some-long-random-string-here"
JWT_REFRESH_EXPIRES_IN="7d"
```

### 4. Start Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:9000
```

---

## 🔐 Auth Flow

### 1. Signup

**POST** `/auth/signup`
#### Request Body
```json
{
  "username": "test",
  "email": "test@gmail.com",
  "password": "test123"
}
```
#### ✅ Response
```json
{
  "success": true,
  "user": {
    "username": "test",
    "email": "test@gmail.com",
    "userType": "user",
    "_id": "69275829c335d74df4124be1",
    "createdAt": "2025-11-26T19:42:33.324Z",
    "updatedAt": "2025-11-26T19:42:33.324Z"
  }
}
```
---

### 2. Login (Sets Cookie)

**POST** `/auth/login`

```json
{
  "email": "test@gmail.com",
  "password": "test123"
}
```

### ✅ Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "...",
    "email": "test@gmail.com"
  }
}
```

👉 JWT is stored in **httpOnly cookie**, not returned in response.

---

### 3. Access Protected Route

**GET** `/profile`

👉 No headers needed
👉 Cookie is automatically sent

---

### 4. Admin Route

**GET** `/admin/users`

👉 Only works if `userType = admin`

---

### 5. Logout

**POST** `/auth/logout`

### ✅ Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

👉 Clears auth cookie

---

## 🍪 Cookie Details

* httpOnly: true
* secure: false (true in production)
* sameSite: lax
* expires: 15 minutes

---

## 🔒 Middleware Logic

* Token is read from: `req.cookies.token`
* Verified using JWT
* User data attached to `req.user`

---

## 🧪 Testing (Postman)

### Step 1 — Login

* Send request → `/auth/login`
* Check **Cookies tab** → token stored

### Step 2 — Access Profile

* Send request → `/profile`
* Should return user data

### Step 3 — Logout

* Send request → `/auth/logout`

### Step 4 — Try Profile Again

* Should return **401 Unauthorized**

---

## ⚠️ Important Notes

* Do NOT store JWT in localStorage (XSS risk)
* Use HTTPS in production → `secure: true`
* Do NOT return password field in responses
* Use refresh tokens for long sessions (not implemented yet)

---

## 🧠 Summary

| Feature  | Implementation               |
| -------- | ---------------------------- |
| Auth     | JWT                          |
| Storage  | httpOnly Cookie              |
| Logout   | Cookie cleared               |
| Security | No token exposed to frontend |

---

## 📌 Previous Version (Bearer Token)

This project originally used Bearer token authentication (Authorization headers) 

Now upgraded to **cookie-based auth for better security and real-world usage**.

---

## 🔥 Next Improvements (You should do this)

* Refresh token system
* Token blacklist (for forced logout)
* Rate limiting per user
* Email verification
* Password reset flow

---

## 👨‍💻 Author

Aaman Sayyed
