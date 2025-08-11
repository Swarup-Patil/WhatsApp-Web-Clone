# 📩 WhatsApp Chat UI & Message Processor (MERN Stack)

A full-stack MERN application that processes WhatsApp webhook payloads, stores them in MongoDB, and displays conversations/messages in a WhatsApp-style UI.  
Includes message sending, status tracking (sent/delivered/read), and a modern chat interface built with **React** + **Styled Components**.

---

## 🚀 Features

### **Backend (Node.js + Express + MongoDB)**
- **Webhook Payload Processor**  
  Reads and processes sample message & status payloads from `/payloads` folder.
- **Message Storage**  
  Saves processed messages in MongoDB with `sent`, `delivered`, and `read` statuses.
- **Duplicate Prevention**  
  No duplicate `messageId` entries in the database.
- **REST APIs**  
  - `GET /conversations` → Get all chat conversations with last message preview.
  - `GET /messages/:wa_id` → Get all messages for a contact.
  - `POST /messages` → Send a message and store it in DB.

### **Frontend (React + Styled Components)**
- **WhatsApp-like Chat UI**
- **Conversation List** with profile initials, last message preview, and timestamp.
- **Chat Window** with:
  - Contact name, profile placeholder, and action icons.
  - Message bubbles styled by sender/receiver.
  - Status icons for sent, delivered, read.
  - Background pattern like WhatsApp.
- **Search Bar** for filtering contacts.
- **Highlight Active Conversation**.

---

## 📂 Project Structure

```
📦 project-root
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── payloads/               # Sample WhatsApp webhook payloads
│   ├── utils/processPayloads.js
│   └── server.js
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   └── assets/
└── README.md
```

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose

**Frontend:**
- React.js
- Styled Components
- Axios

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/whatsapp-chat-mern.git
cd whatsapp-chat-mern
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/whatsapp_chat
```
Run backend server:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/conversations`           | Fetch all conversations              |
| GET    | `/messages/:wa_id`         | Fetch messages for a contact         |
| POST   | `/messages`                | Send a new message                   |

---

## 🖼️ Screenshots

<img width="1917" height="867" alt="Image" src="https://github.com/user-attachments/assets/4fcb81f9-f555-407e-aa3b-642205bfdb05" />

---

## 📜 License
This project is for evaluation purposes.  
Feel free to fork and modify.

---

## 👨‍💻 Author
**Swarup Patil**  
🔗 [LinkedIn](https://www.linkedin.com/in/swarup-santosh-patil/)  
💻 [GitHub](https://github.com/Swarup-Patil)
