import useSize from '@react-hook/size';
import { useEffect, useRef, useState } from 'react';
import { animateScroll } from 'react-scroll';
import {
  ChatDeleteMessage,
  ChatFastScrollButton,
  ChatMessagePinnedCloud,
  ChatMessageText,
  ChatMessageUserCloud,
  ChatMessageUsername,
  ChatMessageWrapper,
  ChatMessageYou,
  ChatMessageYouCloud,
  ChatMessagesBox,
  ChatPinnedMessage,
  ChatPinnedMessageIcon,
  ChatScrollDownIcon,
} from './Chat.styled';

export const ChatBody = ({ socket, messages, isChatOpen, room }) => {
  const ChatBodyEl = useRef();
  // eslint-disable-next-line
  const [_, height] = useSize(ChatBodyEl);
  const [scroll, setScroll] = useState(true);
  const [arePinnedShown, setArePinnedShown] = useState(true);
  const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;

  useEffect(() => {
    scrollToBottom();
  });

  const calculateHeights = () => {
    setScroll(
      height ===
        ChatBodyEl.current.scrollHeight -
          Math.ceil(ChatBodyEl.current.scrollTop) ||
        (ChatBodyEl.current.scrollHeight -
          Math.floor(ChatBodyEl.current.scrollTop) &&
          ChatBodyEl.current.scrollHeight -
            Math.ceil(ChatBodyEl.current.scrollTop) <=
            height &&
          ChatBodyEl.current.scrollHeight -
            Math.floor(ChatBodyEl.current.scrollTop) <=
            height)
    );
  };

  const pinnedMessages = messages
    .filter(message => message.roomLocation === room)
    .some(message => message.isPinned);

  const togglePins = () => {
    setArePinnedShown(shown => !shown);
  };

  const deleteMessage = async message => {
    socket.emit('message:delete', message.id);
  };

  const scrollToBottom = () => {
    if (scroll) {
      animateScroll.scrollToBottom({
        containerId: 'chat-box',
        duration: 50,
      });
    }
  };

  const arrowScroll = () => {
    animateScroll.scrollToBottom({
      containerId: 'chat-box',
      duration: 50,
    });
  };

  return (
    <>
      <ChatMessagesBox
        id="chat-box"
        ref={ChatBodyEl}
        onScroll={calculateHeights}
      >
        {pinnedMessages && (
          <ChatPinnedMessage
            id="chat-pin"
            className={arePinnedShown ? '' : 'minimized'}
          >
            <ChatPinnedMessageIcon
              onClick={togglePins}
              className={arePinnedShown ? '' : 'minimized'}
            />
            {messages
              .filter(
                message => message.isPinned && message.roomLocation === room
              )
              .map(message => (
                <ChatMessageWrapper key={`${message.id}_pin`}>
                  <ChatMessageUsername>{message.username}</ChatMessageUsername>
                  <ChatMessagePinnedCloud>
                    <ChatMessageText
                      dangerouslySetInnerHTML={{
                        __html: message.text.replace(
                          linksRegex,
                          match =>
                            `<a href="${match}" target="_blank">${match}</a>`
                        ),
                      }}
                    ></ChatMessageText>
                  </ChatMessagePinnedCloud>
                </ChatMessageWrapper>
              ))}
          </ChatPinnedMessage>
        )}
        {messages.map(message =>
          message.roomLocation === room ? (
            message.username === localStorage.getItem('userName') &&
            message.userID === localStorage.getItem('userID') ? (
              <ChatMessageWrapper key={message.id}>
                <ChatMessageYou className="sender__name">
                  You ({message.username})
                </ChatMessageYou>
                <ChatMessageYouCloud>
                  <ChatDeleteMessage
                    onClick={() => deleteMessage(message)}
                    id={message._id}
                  />
                  <ChatMessageText
                    dangerouslySetInnerHTML={{
                      __html: message.text.replace(
                        linksRegex,
                        match =>
                          `<a href="${match}" target="_blank">${match}</a>`
                      ),
                    }}
                  ></ChatMessageText>
                </ChatMessageYouCloud>
              </ChatMessageWrapper>
            ) : (
              <ChatMessageWrapper key={message.id}>
                <ChatMessageUsername>{message.username}</ChatMessageUsername>
                <ChatMessageUserCloud className="message__recipient">
                  <ChatMessageText
                    dangerouslySetInnerHTML={{
                      __html: message.text.replace(
                        linksRegex,
                        match =>
                          `<a href="${match}" target="_blank">${match}</a>`
                      ),
                    }}
                  ></ChatMessageText>
                </ChatMessageUserCloud>
              </ChatMessageWrapper>
            )
          ) : null
        )}
      </ChatMessagesBox>
      {!scroll && isChatOpen && (
        <ChatFastScrollButton onClick={arrowScroll}>
          <ChatScrollDownIcon />
        </ChatFastScrollButton>
      )}
    </>
  );
};
