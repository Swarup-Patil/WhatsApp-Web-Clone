// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "https://whatsapp-web-clone-1vln.onrender.com/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Get all conversations
export const getConversations = async () => {
  try {
    const res = await api.get("/conversations");
    return res.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

// Get messages by wa_id
export const getMessagesByWaId = async (wa_id) => {
  try {
    const res = await api.get(`/messages/${wa_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Send message (demo)
export const sendMessage = async (messageData) => {
  try {
    console.log(messageData , "data")
    const res = await api.post("/messages", messageData);
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const services = {
  getConversations,
  getMessagesByWaId,
  sendMessage
};

export default services;
