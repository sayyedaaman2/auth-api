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

## ⚙️ Local Setup (Without Docker)

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
MONGO_URI=mongodb://127.0.0.1:27017/auth-api
JWT_SECRET=some-long-random-string-here
JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=some-long-random-string-here
JWT_REFRESH_EXPIRES_IN=7d
```

### 4. Start Server

```bash
npm run dev
```

Server runs on:
👉 http://localhost:9000

---

## 🐳 Docker Setup (Recommended)

Run this app using Docker (no need to install Node or Mongo locally).

---

### 1. Create `.env`

```env
PORT=9000
MONGO_URI=mongodb://mongo:27017/auth-api
JWT_SECRET=some-long-random-string-here
JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=some-long-random-string-here
JWT_REFRESH_EXPIRES_IN=7d
```

---

### 2. Build & Run

```bash
docker compose up --build
```

---

### 3. Run in Background

```bash
docker compose up -d --build
```

---

### 4. Stop Containers

```bash
docker compose down
```

---

### 5. Reset (Delete DB Data)

```bash
docker compose down -v
```

---

### 6. View Logs

```bash
docker compose logs -f
```

---

## ⚠️ Important Notes

* Use `mongo` as DB host (NOT `localhost`) in Docker
* Do NOT use quotes in `.env`
* App runs on: http://localhost:9000

---

## 🧱 Docker Files

### Dockerfile

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]
```

---

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "9000:9000"
    env_file:
      - .env
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
```

---

## 🔐 Auth Flow

### 1. Signup

**POST** `/auth/signup`

```json
{
  "username": "test",
  "email": "test@gmail.com",
  "password": "test123"
}
```

---

### 2. Login

**POST** `/auth/login`

👉 JWT stored in httpOnly cookie

---

### 3. Access Protected Route

**GET** `/profile`

---

### 4. Admin Route

**GET** `/admin/users`

👉 Requires `userType = admin`

---

### 5. Logout

**POST** `/auth/logout`

👉 Clears auth cookie

---

## 🍪 Cookie Details

* httpOnly: true
* secure: false (true in production)
* sameSite: lax
* expires: 15 minutes

---

## 🔒 Security Notes

* Do NOT store JWT in localStorage
* Use HTTPS in production
* Never expose password fields
* Implement refresh tokens for long sessions

---

## 🧠 Summary

| Feature  | Implementation       |
| -------- | -------------------- |
| Auth     | JWT                  |
| Storage  | httpOnly Cookie      |
| Logout   | Cookie cleared       |
| Security | No token in frontend |

---

## 🔥 Next Improvements

* Refresh token system
* Token blacklist
* Email verification
* Password reset flow

---

## 👨‍💻 Author

Aaman Sayyed
