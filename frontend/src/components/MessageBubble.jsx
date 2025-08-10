import styled from "styled-components";
import sentIcon from "../assets/sent.png";
import deliveredIcon from "../assets/delivered.png";
import readIcon from "../assets/read.png";

const Bubble = styled.div`
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ isSender }) => (isSender ? "#005c4b" : "#202c33")};
  align-self: ${({ isSender }) => (isSender ? "flex-end" : "flex-start")};
  position: relative;
`;

const TimeStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 10px;
  color: #aebac1;
  margin-top: 5px;
`;

export default function MessageBubble({ msg }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return sentIcon;
      case "delivered":
        return deliveredIcon;
      case "read":
        return readIcon;
      default:
        return null;
    }
  };

  return (
    <Bubble isSender={msg.fromMe}>
      {msg.text}
      <TimeStatus>
        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        {msg.fromMe && <img src={getStatusIcon(msg.status)} alt={msg.status} style={{ marginLeft: "5px", width: "16px" }} />}
      </TimeStatus>
    </Bubble>
  );
}
