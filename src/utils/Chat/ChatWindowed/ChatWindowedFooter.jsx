import axios from 'axios';
import { useState } from 'react';
import { animateScroll } from 'react-scroll';
import {
  ChatFooterBox,
  ChatMessageForm,
  ChatSend,
  ChatWindowedMessageInput,
  СhatSendMessageButton,
} from '../Chat.styled';

export const ChatWindowedFooter = ({ socket, room }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async e => {
    e.preventDefault();
    console.log(message);
    console.log(message.trim() && localStorage.getItem('userName'));
    const ip = await axios.get('https://jsonip.com/');
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        username: localStorage.getItem('userName'),
        userID: localStorage.getItem('userID'),
        userIP: ip.data.ip,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        roomLocation: room,
      });
    }
    console.log({ userName: localStorage.getItem('userName'), message });
    setMessage('');

    animateScroll.scrollToBottom({
      containerId: 'chat-box',
      duration: 0,
    });
  };

  return (
    <ChatFooterBox>
      <ChatMessageForm className="form" onSubmit={handleSendMessage}>
        <ChatWindowedMessageInput
          type="text"
          placeholder="Введіть повідомлення"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <СhatSendMessageButton>
          <ChatSend />
        </СhatSendMessageButton>
      </ChatMessageForm>
    </ChatFooterBox>
  );
};
