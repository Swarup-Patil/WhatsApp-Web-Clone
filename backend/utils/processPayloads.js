import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Message from '../models/Message.js';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processPayloads = async () => {
  const payloadDir = path.join(__dirname, '../payloads');

  let files;
  try {
    files = fs.readdirSync(payloadDir);
  } catch (err) {
    console.error("Error: Failed to read payload directory:", err.message);
    return;
  }

  for (let file of files) {
    try {
      const rawData = fs.readFileSync(path.join(payloadDir, file), 'utf-8');
      const data = JSON.parse(rawData);

      if (file.includes('message')) {
        const msg = data?.metaData?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        const contact = data?.metaData?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];

        if (!msg || !contact) {
          console.warn(`Skipping ${file}: Missing message or contact data`);
          continue;
        }

        // Check for duplicate messageId
        const exists = await Message.findOne({ messageId: msg.id });
        if (exists) {
          console.warn(`Skipping ${file}: Duplicate messageId ${msg.id}`);
          continue;
        }

        await Message.create({
          wa_id: contact.wa_id,
          name: contact.profile?.name || "Unknown",
          messageId: msg.id,
          text: msg.text?.body || "",
          fromMe: msg.from !== contact.wa_id,
          timestamp: new Date(parseInt(msg.timestamp) * 1000),
          status: "sent"
        });

      } else if (file.includes('status')) {
        const statusData = data?.metaData?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0];

        if (!statusData?.id) {
          console.warn(`Skipping ${file}: Missing status ID`);
          continue;
        }

        await Message.findOneAndUpdate(
          { messageId: statusData.id },
          { status: statusData.status },
          { new: true }
        );
      }

    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log("Payload processing complete");
};

export default processPayloads;
