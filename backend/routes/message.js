import express from "express";
import { getConversations, getMessagesByWaId, sendMessage } from "../controllers/message.js";

const router = express.Router();

// Routes
router.get("/conversations", getConversations);
router.get("/messages/:wa_id", getMessagesByWaId);
router.post("/messages", sendMessage);

export default router;
