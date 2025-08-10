import express from "express";
import dotenv from "dotenv";
import initDB from "./config/initDb.js";
import initMiddleware from "./utils/initMiddleware.js";
import processPayloads from "./utils/processPayloads.js";

import messageRoutes from "./routes/message.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Initializing DB
await initDB();

// Initializing middleware 
initMiddleware(app);

app.get("/", (req, res) => {
  res.send("Let's clone whatsapp web");
});

// API routes
app.use("/api", messageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  processPayloads()
});
