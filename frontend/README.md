# 🌿 MindMirror

### Track. Analyze. Discover. Reflect.

MindMirror is a personal wellbeing pattern analyzer that helps users record their daily mood, stress, energy, sleep, goals, and diary entries.

The application stores the user's personal data and provides simple insights based on their previous check-ins.

---

## ✨ Features

- 🏠 Home page
- 📊 Wellbeing dashboard
- 🙂 Daily mood tracking
- 😟 Stress tracking
- ⚡ Energy tracking
- 🌙 Sleep tracking
- 🎯 Daily goal tracking
- 📔 Personal diary
- 📋 Check-in history
- 🔍 Personal pattern detection
- 📈 Average wellbeing summary
- 💾 Data stored in MongoDB

---

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

---

## 📁 Project Structure

```text
MindMirror
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend
    ├── models
    │   ├── CheckIn.js
    │   └── Diary.js
    ├── routes
    │   ├── checkInRoutes.js
    │   └── diaryRoutes.js
    ├── server.js
    └── package.json