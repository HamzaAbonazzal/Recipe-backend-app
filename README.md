# 🍳 Recipe App - Backend API

A robust RESTful API built with **Node.js**, **Express.js**, and **MySQL** to power a full-featured cooking recipe application. It supports user authentication, recipe management, categories, and database connection via SSL.

---

## 🚀 Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MySQL](https://www.mysql.com/) (Cloud hosted on Aiven)
- **Database Driver:** `mysql2` with SSL support
- **Environment Variables:** `dotenv`
- **CORS Management:** `cors`

---

## ✨ Features

- 🍲 **Recipe Management:** CRUD operations (Create, Read, Update, Delete) for recipes.
- 🏷️ **Categorization & Search:** Filter recipes by category, ingredients, or preparation time.
- 🔒 **Secure Database Connection:** Uses SSL encryption for production database access.
- 🌐 **Production-Ready CORS Configuration:** Secure endpoints for cross-origin requests.

---

## 📂 Project Structure

```text
├── config/             # Database and server configuration files
├── controllers/        # Request handlers & logic
├── middleware/         # Custom Express middlewares (Auth, Validation)
├── models/             # Database queries & schemas
├── routes/             # API endpoint routes
├── .env.example        # Environment variables template
├── .gitignore          # Files ignored by Git
├── package.json        # Node dependencies and scripts
├── README.md           # Project documentation
└── server.js           # Express app entry point
```
