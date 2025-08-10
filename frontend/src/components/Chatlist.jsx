import styled from "styled-components";
import menuIcon from "../assets/menu.png";
import searchIcon from "../assets/Search.png";

const ChatListWrapper = styled.div`
  width: 30%;
  background-color: #141b21;
  border-right: 1px solid #2a3942;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #202c33;
  border-bottom: 1px solid #2a3942;
`;

const HeaderTitle = styled.h2`
  color: white;
  font-size: 20px;
  margin: 0;
`;

const MenuIcon = styled.img`
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #202c33;
  border-bottom: 1px solid #2a3942;
`;

const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  background-color: #2a3942;
  border: none;
  border-radius: 20px;
  color: white;
  outline: none;
`;

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #2a3942;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#2a3942" : "transparent")};

  &:hover {
    background-color: #2a3942;
  }
`;

const ChatInfo = styled.div`
  display: flex;
`;

const ChatName = styled.strong`
  display: block;
  color: white;
  margin-bottom: 4px;
`;

const ChatLastMessage = styled.p`
  color: #aebac1;
  font-size: 14px;
  margin: 0;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PseudoProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  background: green;
  font-weight: 500;
  margin-right: 10px;
`;

const ChatTime = styled.span`
  font-size: 12px;
  color: #aebac1;
`;

export default function ChatList({ conversations, onSelect, selectedContact }) {
  return (
    <ChatListWrapper>
      {/* Header */}
      <Header>
        <HeaderTitle>WhatsApp</HeaderTitle>
        <MenuIcon src={menuIcon} alt="Menu" />
      </Header>

      {/* Search Bar */}
      <SearchContainer>
        <SearchIcon src={searchIcon} alt="Search" />
        <SearchInput placeholder="Search or start a new chat" />
      </SearchContainer>

      {/* Chat List */}
      <ChatListContainer>
        {conversations.map((chat) => (
          <ChatItem
            key={chat._id || chat.wa_id}
            onClick={() => onSelect(chat)}
            selected={selectedContact?._id === (chat._id || chat.wa_id)}
          >
            <ChatInfo>
              <PseudoProfile>{(chat.name || chat.wa_id).charAt(0).toUpperCase()}</PseudoProfile>
              <div>
                <ChatName>{chat.name || chat.wa_id}</ChatName>
                <ChatLastMessage>{chat.lastMessage || "No messages yet"}</ChatLastMessage>
              </div>
            </ChatInfo>
            {chat.lastTimestamp && (
              <ChatTime>
                {new Date(chat.lastTimestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </ChatTime>
            )}
          </ChatItem>
        ))}
      </ChatListContainer>
    </ChatListWrapper>
  );
}
