import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  wa_id: { 
    type: String, 
    required: true, // must have a WhatsApp ID
    trim: true 
  },
  name: { 
    type: String, 
    default: null, 
    trim: true 
  },
  messageId: { 
    type: String, 
    required: true, 
    unique: true, // avoid duplicate messages in DB
    index: true   // speeds up lookups for updates
  },
  text: { 
    type: String, 
    required: true,
    trim: true 
  },
  fromMe: { 
    type: Boolean, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    required: true,
    default: Date.now // if not provided, use current time
  },
  status: { 
    type: String, 
    enum: ["sent", "delivered", "read"], 
    default: "sent" 
  }
});

const Message = mongoose.model('Message', messageSchema, 'processed_messages');

export default Message;
