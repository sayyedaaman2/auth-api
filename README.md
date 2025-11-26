# auth-api 🔐

A simple authentication API built with **Node.js, Express, MongoDB (Mongoose), bcryptjs, and JWT**.

It supports:

- User signup
- User login → JWT token
- Protected `/profile` route
- Admin-only `/admin/users` route

---

## 1. Features & Why They Matter

| Feature | Why it matters |
|--------|----------------|
| **User Signup** | Core user creation for any app |
| **User Login → JWT Token** | Shows you understand token-based auth |
| **Protected `/profile`** | Demonstrates authentication middleware |
| **Admin-only `/admin/users`** | Demonstrates role-based access control |

---

## 2. Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express  
- **Database:** MongoDB with Mongoose  
- **Auth:** JSON Web Token (JWT)  
- **Password hashing:** bcryptjs  
- **Env management:** dotenv  
- **Dev:** nodemon

From `package.json`:

- `"express": "^5.1.0"`
- `"mongoose": "^9.0.0"`
- `"bcryptjs": "^3.0.3"`
- `"jsonwebtoken": "^9.0.2"`
- `"dotenv": "^17.2.3"`
- `"nodemon": "^3.1.11"` (dev)

---

## 3. Getting Started (Step by Step)

### 3.1. Clone the Repository

```sh
git clone https://github.com/sayyedaaman2/auth-api.git
cd auth-api
```

### 3.2. Install Dependencies
```sh
npm install
```

### 3.3. Create .env File
In the project root, create a file named .env:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000

```
Replace values with your actual config.
### 3.4. Start the Server
*Dev mode* (with nodemon):
```sh
npm install
```
*Production mode:*
```sh
npm start
```
By default, server runs on:
```txt
http://localhost:3000
```
## 4. Auth Flow (Step by Step)
### Step 1: Signup
#### Endpoint
```http
POST /signup
```
#### Request Body
```json
{
  "username": "test",
  "email": "test@gmail.com",
  "password": "test123"
}
```
#### Sample Response
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
### Step 2: Login (Get JWT Token)
#### Endpoint
```http
POST /login
```
#### Request Body
```json
{
  "email": "test@gmail.com",
  "password": "test123"
}

```
#### Sample Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "692758aada028bbabe23cac5",
    "username": "aamansayyed",
    "email": "sayyedaaman9@gmail.com",
    "userType": "admin",
    "createdAt": "2025-11-26T19:44:42.562Z",
    "updatedAt": "2025-11-26T19:44:42.562Z"
  }
}
```
You will use this `token` as a **Bearer token** for protected routes.
### Step 3: Get Profile (Protected Route)
Requires a valid JWT from the ***Login*** step.
#### Endpoint
```http
GET /profile
```

#### Headers
```json
Authorization: Bearer JWT_TOKEN_HERE
```
#### Sample Response
```json
{
  "success": true,
  "user": {
    "_id": "69275829c335d74df4124be1",
    "username": "test",
    "email": "test@gmail.com",
    "userType": "user",
    "createdAt": "2025-11-26T19:42:33.324Z",
    "updatedAt": "2025-11-26T19:42:33.324Z"
  }
}

```
### Step 4: Admin-Only Users List
Only accessible if the logged-in user has `userType: "admin"`.
#### Endpoint
```http
GET /admin/users
```

#### Headers
```json
Authorization: Bearer JWT_TOKEN_OF_ADMIN

```
#### Sample Response
```json
{
  "success": true,
  "users": [
    {
      "_id": "692758aada028bbabe23cac5",
      "username": "aamansayyed",
      "password": "$2b$10$WnKXiNNnmLUFMT/1dZoWEuq2LSuYeLYK.IakfmZLqljluwLGwKTw6",
      "email": "sayyedaaman9@gmail.com",
      "userType": "admin",
      "createdAt": "2025-11-26T19:44:42.562Z",
      "updatedAt": "2025-11-26T19:44:42.562Z"
    }
  ]
}
```
### In a real-world app, you would usually not return the password field, even if it's hashed. It’s shown here only because it exists in the sample response.
# 5. Typical Usage Summary
**1. Start server**
- `npm run dev`

**Signup a new user**

- `POST /signup`

**Login with that user**

- `POST /login` → copy the `token` from response

**Call /profile**

- Add header: `Authorization: Bearer <token>`

**If user is admin, call** `/admin/users`

- Add header: `Authorization: Bearer <admin_token>`

## 6. Test the API in Postman or Thunder Client

### Step 1 — Sign up
Send POST → /signup  
Copy returned user details.

### Step 2 — Login
Send POST → /login  
Copy the `"token"` from response.

### Step 3 — Access Profile Route
Send GET → /profile  
Headers →
Authorization: Bearer <your_token_here>

You should receive logged-in user details.

### Step 4 — Access Admin Route (Only admin tokens allowed)
GET → /admin/users  
Headers →
Authorization: Bearer <admin_token_here>

If token belongs to admin → users list returned
If not admin → Access Denied (403)
