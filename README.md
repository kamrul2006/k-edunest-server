# 🌐 K-EduNest Server


The **K-EdNest Server** is the backend service for the K-EduNest platform. Built with **Express.js** and **MongoDB**, this server handles routing, authentication, user management, and API communication for the frontend client.

---

## 📁 Project Structure

```
k-edunest-server/
├── index.js           # Entry point for the server
├── .env               # Environment variables
├── package.json       # Project metadata and dependencies
└── ...                # Add your routes, controllers, etc.
```

---

## 🚀 Getting Started

### 🧰 Prerequisites

* Node.js (v16 or above)
* MongoDB (local or MongoDB Atlas)

---

### 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/k-edunest-server.git
cd k-edunest-server
```

2. **Install Dependencies**

```bash
npm install
```

3. **Create a `.env` File**

```bash
touch .env
```

Example contents:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/k-Blogify
JWT_SECRET=your_jwt_secret
```

> 🔐 Keep your `.env` file out of version control using a `.gitignore` entry.

---

### ▶️ Running the Server

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env`).

---

## 📦 Dependencies

| Package       | Description                                |
| ------------- | ------------------------------------------ |
| express       | Web framework for Node.js                  |
| cors          | Middleware to enable Cross-Origin requests |
| dotenv        | Loads environment variables from `.env`    |
| mongodb       | MongoDB native driver                      |
| jsonwebtoken  | JWT-based authentication                   |
| cookie-parser | Parse cookies attached to client requests  |

---

## 🛠️ API Overview

Here’s a basic example route to fetch a user by email:

```js
app.get('/users', async (req, res) => {
  const email = req.query.email;
  const user = await usersCollection.findOne({ email });
  res.send(user);
});
```

> 💡 Add more routes in modular files (e.g., `/routes`, `/controllers`) as your project grows.

---

## ❓ Troubleshooting

* **MongoDB connection errors**: Make sure your `MONGODB_URI` is correct and your IP is whitelisted if using Atlas.
* **CORS issues**: Confirm that `cors()` middleware is applied and configured correctly.
* **JWT errors**: Check for correct secret keys and valid token handling.

---

## 👨‍💻 Author

Kamrul Islam Apurba.

---

## 📄 License

This project is licensed under the **ISC License**.
You can modify and distribute it as needed.

---


