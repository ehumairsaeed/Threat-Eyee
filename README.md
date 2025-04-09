
# 🛡️ Threat Eyee – AI Threat Detection App

**Threat Eyee** is a real-time AI-powered threat detection tool that analyzes suspicious text messages and flags phishing, scams, and social engineering attempts. Built for cybersecurity awareness and protection, especially for non-technical users.

## 🌐 Live Demo

- 🔗 Frontend: [https://threateyee.netlify.app](https://threateyee.netlify.app)
- 🔗 Backend: [https://threat-eyee-backend1-production.up.railway.app/](https://threat-eyee-backend1-production.up.railway.app/)

---

## 🚀 Features

- 💬 Input suspicious messages and scan them
- ⚠️ Detects phishing, scams, and manipulation patterns
- 🧠 Powered by AI (Groq/LLM backend)
- ✅ Shows safer alternative versions
- 🌙 Hacker-style dark UI design
- 📱 Fully responsive and fast

---

## 🧰 Tech Stack

### Frontend:
- React + Vite
- TailwindCSS
- Lucide Icons
- Hosted on Netlify

### Backend:
- Node.js (Express)
- Hosted on Render

---

## 📦 Local Setup Instructions

### 🔧 Clone the repo

```bash
git clone https://github.com/yourusername/threat-eyee.git
cd threat-eyee
```

### 🔹 Frontend

```bash
cd Threat-Eyee-Frontend
npm install
npm run dev
```

### 🔸 Backend

```bash
cd Threat-Eyee-Backend
npm install
node index.js
change GROQ API KEY FROM .env
```

Make sure the backend runs on port `5000` or adjust the fetch URL in frontend accordingly.

---

## 🧪 Example Use Case

> “Hey, I just got this message claiming I won a lottery! It asks for my credit card info to claim the prize. What do you think?”

✅ Output:
- **Risk Level:** ⚠️ RISK
- **Type:** Phishing Scam
- **Reason:** Suspicious financial language and unsolicited prize claim
- **Safer Version:** “Congratulations! You've won a prize! To claim it, contact our team at [legitimate link]. We will never ask for sensitive info via text.”

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork and enhance the tool or UI.

---

## 📄 License

MIT © 2025 Umair Saeed

---

## ✨ Credits

Made with ❤️ by a cybersecurity enthusiast during the **HACKHAZARDS ‘25** hackathon.
