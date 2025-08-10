import Message from "../models/Message.js";

// Get all conversations
export const getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      { $sort: { timestamp: 1 } },
      {
        $group: {
          _id: "$wa_id",
          name: { $first: "$name" },
          lastMessage: { $last: "$text" },
          lastTimestamp: { $last: "$timestamp" }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

// Get messages by wa_id
export const getMessagesByWaId = async (req, res) => {
  try {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { wa_id, text } = req.body;

    if (!wa_id || !text) {
      return res.status(400).json({ error: "wa_id and text are required" });
    }

    const newMessage = await Message.create({
      wa_id,
      name: wa_id.name || null,
      messageId: `demo-${Date.now()}`,
      text,
      fromMe: true,
      timestamp: new Date(),
      status: "sent"
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
