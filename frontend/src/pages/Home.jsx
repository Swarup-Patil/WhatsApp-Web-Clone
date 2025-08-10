// pages/Home.jsx
import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ChatList from "../components/Chatlist";
import { getConversations, getMessagesByWaId, sendMessage } from "../services/api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const handleSelect = async (chat) => {
    setSelectedContact(chat);
    console.log(chat, "chat")
    try {
      const data = await getMessagesByWaId(chat._id);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleSendMessage = async (wa_id, text) => {
    try {
      const newMsg = await sendMessage({ wa_id, text});
      setMessages((prev) => [...prev, newMsg]);
      loadConversations(); 
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Container>
      <ChatList conversations={conversations} onSelect={handleSelect} selectedContact={selectedContact} />
      {selectedContact && (
        <ChatWindow
          messages={messages}
          chat={selectedContact}
          onSendMessage={handleSendMessage}
        />
      )}
    </Container>
  );
}
