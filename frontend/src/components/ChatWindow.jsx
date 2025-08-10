import { useState } from "react";
import styled from "styled-components";
import MessageBubble from "./MessageBubble";
import whatsappBg from "../assets/whatsappbg.png";
import callIcon from "../assets/call.png";
import searchIcon from "../assets/Search.png";
import menuIcon from "../assets/menu.png";

const ChatWindowContainer = styled.div`
  flex: 1;
  background-color: #0b141a;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #202c33;
  border-bottom: 1px solid #2a3942;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PseudoProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  background: green;
  color: white;
  font-size: 20px;
  border-radius: 50%;
`;

const ContactName = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  color: white;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Icon = styled.img`
  margin-left: 20px;
  cursor: pointer;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
    background-image: 
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
    url(${whatsappBg}); 
  background-repeat: repeat;
  background-size: auto; 
`

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  background-color: #202c33;
  border-top: 1px solid #2a3942;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #2a3942;
  color: white;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #005c4b;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export default function ChatWindow({ messages, chat, onSendMessage }) {
  const [newMessage, setNewMessage] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(chat, newMessage);
    setNewMessage("");
  };

  return (
    <ChatWindowContainer>
      {/* Header */}
      <Header>
        <ContactInfo>
          <PseudoProfile>
            {(chat.name.charAt(0) || "").toUpperCase()}
          </PseudoProfile>
          <ContactName>
            <Name>{chat.name}</Name>
          </ContactName>
        </ContactInfo>
        <Actions>
          <Icon src={callIcon} alt="Call" />
          <Icon src={searchIcon} alt="Search" />
          <Icon src={menuIcon} alt="Menu" />
        </Actions>
      </Header>

      {/* Messages */}
      <MessagesContainer>
        {messages.map((msg) => (
          <MessageBubble key={msg._id || msg.messageId} msg={msg} />
        ))}
      </MessagesContainer>

      {/* Message Input */}
      <InputContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendButton type="submit">➤</SendButton>
      </InputContainer>
    </ChatWindowContainer>
  );
}
