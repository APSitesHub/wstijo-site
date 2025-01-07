import { ChatWindowedContainer } from '../Chat.styled';
import { ChatWindowedBody } from './ChatWindowedBody';
import { ChatWindowedFooter } from './ChatWindowedFooter';

export const ChatWindowed = ({ socket, messages, room }) => {
  return (
    <ChatWindowedContainer>
      <ChatWindowedBody socket={socket} messages={messages} room={room} />
      <ChatWindowedFooter socket={socket} room={room} />
    </ChatWindowedContainer>
  );
};
