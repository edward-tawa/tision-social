# NextStep
A real-time chat app built with Next.js and Django using WebSockets.

- [NextStep](#nextstep)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
    - [Backend (Django)](#backend-django)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
  - [Frontend (.env.local)](#frontend-envlocal)
- [API Documentation](#api-documentation)
    - [Login](#login)
    - [Send Message](#send-message)
    - [WebSocket Path](#websocket-path)
- [Web Socket Protocol](#web-socket-protocol)
    - [Example WebSocket Message](#example-websocket-message)
- [Test Instructions](#test-instructions)
- [Deployment](#deployment)
    - [Deploying to Vercel](#deploying-to-vercel)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)
- [Credit/Inspiration](#creditinspiration)


# Features
- 🔐 User authentication (JWT, cookies)
- 💬 Real-time messaging via WebSocket
- 📱 Responsive mobile UI
- 🗂 Conversations with multiple users
- 🧠 Redux state management
- 


# Tech Stack
- Frontend: Next.js, Tailwind CSS, Redux Toolkit
- Backend: Django, Django REST Framework, Django Channels
- WebSocket: Redis, Django Channels
- DB: PostgreSQL

# Installation
### Backend (Django)

```bash
git clone https://github.com/yourusername/mychatapp.git
cd mychatapp/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

# Usage
Register a new account or log in using an existing user.

- Navigate to the chat interface.

- Start messaging in real time.

- Messages are sent and received using WebSockets.
# Environment Variables

## Backend
    SECRET_KEY=your-django-secret-key
    DEBUG=True
    ALLOWED_HOSTS=localhost,127.0.0.1
    REDIS_URL=redis://localhost:6379

## Frontend (.env.local)
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/chat/

# API Documentation
### Login
`POST /api/token/`

### Send Message
`POST /api/messages/`

### WebSocket Path
`ws://localhost:8000/ws/chat/<room_name>/`

# Web Socket Protocol

### Example WebSocket Message
```json
{
  "type": "chat_message",
  "message": "Hello",
  "sender": "user123"
}
```md
![Chat UI](./screenshots/chat.png)
```

# Test Instructions

# Deployment
### Deploying to Vercel
- Connect your GitHub repo
- Set environment variables

# Limitations

# Contributing

# License 
- MIT License © 2025 Edward Tawa

# Credit/Inspiration


