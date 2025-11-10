# 🧠 BugBuddy — Backend (Node.js + Express.js + MongoDB)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

The **BugBuddy Backend** powers the RESTful APIs for the **BugBuddy Social Platform** — a space where tech enthusiasts (“Bugs”) connect, collaborate, and share knowledge (“Buddy” concept).  
It handles **user authentication, data storage, post management**, and secure communication between frontend and database.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** using **JWT** and **bcrypt** for password security.  
- 👥 **User Management** (Sign up, Login, Profile, Logout).  
- 📝 **Post APIs** for creating, editing, deleting, and fetching posts.  
- 💾 **MongoDB Integration** using **Mongoose** for efficient data modeling.  
- ⚙️ **Environment Configuration** with `.env` for scalability.  
- 🧪 **Postman-tested** endpoints for API validation.  
- 🔧 **Secure & Optimized** with Helmet, CORS, and Morgan middleware.

---

## 🧩 Tech Stack

**Core:**  
- Node.js  
- Express.js  
- MongoDB (Mongoose ODM)  

**Security & Auth:**  
- JWT  
- bcrypt.js  
- dotenv  

**Utilities:**  
- cors  
- helmet  
- morgan  
- nodemon  

---

## 🛠️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rupesh-ranjan/BugBuddy
cd bugbuddy-backend
npm install
npm run dev
