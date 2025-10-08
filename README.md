# 🌐 Tision Social

A modern **social networking platform** built to connect people through meaningful interactions — combining real-time communication, user engagement features, and a clean, responsive interface.

---

## 🚀 Overview

**Tision Social** is a full-stack social media platform I’ve been developing over the past few months to strengthen my skills in **Django REST Framework (DRF)** and **Next.js**.  
It enables users to:

- Create accounts and manage profiles  
- Post content and engage with others  
- Chat in real-time using WebSockets  
- Manage authentication securely with JWT stored in cookies  

This project demonstrates my ability to design, develop, and deploy **scalable full-stack applications** using modern tools and best practices.

---

## ⚙️ Tech Stack

| Layer | Technologies |
|:------|:--------------|
| **Frontend** | Next.js (React), TypeScript, Tailwind CSS |
| **Backend** | Django, Django REST Framework |
| **Authentication** | JSON Web Tokens (JWT) with HTTP-only cookies |
| **Database** | PostgreSQL / SQLite (for development) |
| **Real-time Chat** | Django Channels + Redis |
| **Version Control** | Git, GitHub |
| **Deployment** | Ready for Render / Vercel / Docker |

---

## ✨ Features

- 🔐 **Authentication System:** Secure login & registration with JWT tokens.  
- 👤 **User Profiles:** Editable profiles with bios and profile pictures.  
- 🧵 **Posts & Feeds:** Dynamic content creation and engagement.  
- 💬 **Real-time Chat:** WebSocket-based chat using Django Channels & Redis.  
- 🔔 **Notifications:** In-app notifications for new messages and interactions.  
- 📱 **Responsive Design:** Optimized for both mobile and desktop using Tailwind CSS.  
- ⚡ **API-Driven Architecture:** Fully modular backend with Django REST Framework.

---

## 🧩 Architecture

Frontend (Next.js)
↳ Calls REST APIs via Axios
↳ Handles routing and UI rendering

Backend (Django REST Framework)
↳ Manages authentication, data, and APIs
↳ Uses Django Channels + Redis for WebSocket communication

Database
↳ Stores users, posts, messages, and notifications

yaml
Copy code

---

## 🧠 What I Learned

Building **Tision Social** over the past 3–4 months helped me:

- Master **JWT authentication** and cookie-based session handling  
- Build and consume **REST APIs** using Django REST Framework  
- Implement **real-time features** with Django Channels and Redis  
- Improve **frontend design patterns** in Next.js  
- Strengthen my **problem-solving and debugging** mindset  
- Apply **version control workflows** using Git and GitHub

---

## 🧪 Setup Instructions

### Backend (Django)

```bash
git clone https://github.com/edward-tawa/tision-social.git
cd tision-social/backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend (Next.js)
bash
Copy code
cd tision-social/frontend
npm install
npm run dev
Access the app at 👉 http://localhost:3000
