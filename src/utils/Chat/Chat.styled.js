import styled from 'styled-components';
import chat1xBGPng from '../../img/bg/chat-bg.png';
import chat1xBGWebp from '../../img/bg/chat-bg.webp';
import { ReactComponent as ChatSendIcon } from '../../img/svg/sendIcon.svg';
import { ReactComponent as ChatScrollDownArrow } from '../../img/svg/downArrow.svg';
import { ReactComponent as PinnedMessageIcon } from '../../img/svg/pinnedMessage.svg';
import { ReactComponent as DeleteMessageIcon } from '../../img/svg/deleteMessage.svg';
import { ReactComponent as DeleteUserMessageIcon } from '../../img/svg/trash.svg';
import { ReactComponent as BanUserIcon } from '../../img/svg/banUser.svg';
import { ReactComponent as EmojiSwitchIcon } from '../../img/svg/emojiPicker.svg';
import { ChatLogo } from 'components/Stream/Stream.styled';

export const ChatLoginForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;

  background-image: image-set(
    url(${chat1xBGWebp}) type('image/webp'),
    url(${chat1xBGPng}) type('image/png')
  );
  background-size: 100% auto;
  background-position: top 40% center;
  background-repeat: no-repeat;

  @media screen and (min-width: 1280px) {
    height: 100vh;
  }
`;

export const ChatLoginHeader = styled.h2`
  font-size: 30px;
  color: var(--chat-font-color);
`;

export const ChatLoginLabel = styled.label`
  font-size: 18px;
  max-width: 280px;
  text-align: center;
`;

export const ChatLoginInput = styled.input`
  border: 1.5px solid var(--accent-color);
  border-radius: 8px;
  padding: 8px;
  font-size: 18px;
  width: 80%;

  transition: background-color var(--animation-global);

  &:hover,
  &:focus {
    background-color: var(--accent-transparent-color);
  }
`;

export const ChatLoginValidation = styled.p`
  color: red;
  font-size: 14px;
  max-width: 250px;
  text-align: center;
`;

export const ChatLoginButton = styled.button`
  width: 55%;
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
  background-color: #607eaa;
  color: #f9f5eb;
  outline: none;
  border: none;
  border-radius: 5px;

  transition: background-color var(--animation-global),
    color var(--animation-global);

  &:hover,
  &:focus {
    background-color: var(--main-color);
    color: var(--accent-color);
  }
`;

export const ChatContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: image-set(
    url(${chat1xBGWebp}) type('image/webp'),
    url(${chat1xBGPng}) type('image/png')
  );
  background-size: 35%;
  background-position: top 65px left 35px;
  background-repeat: no-repeat;
  background-color: var(--chat-background-color);

  @media screen and (orientation: landscape) {
    max-width: 300px;

    background-size: calc(100% - 64px);
    background-position: top 120px center;
  }

  @media screen and (min-width: 1280px) {
    height: 100vh;
    max-width: 300px;

    background-size: calc(100% - 64px);
    background-position: top 120px center;
  }
`;

export const ChatWindowedContainer = styled(ChatContainer)`
  position: relative;

  background-image: unset;
  background-color: #0f0f0f;

  height: 100vh;
  max-width: none;
`;

export const ChatMessagesBox = styled.div`
  width: 100%;
  height: 95%;
  padding: 10px;
  padding-top: 0;
  overflow-x: hidden;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  @media screen and (min-width: 1280px) {
    height: 95vh;
  }

  & :first-child:not(#chat-pin):not(svg) {
    margin-top: auto;
  }

  & #chat-pin + :nth-child(2) {
    margin-top: auto;
  }

  & #chat-pin {
    margin-top: 0;
  }
`;

export const ChatWindowedMessagesBox = styled(ChatMessagesBox)`
  padding-top: 8px;
  height: 95vh;

  & :first-child:not(svg) {
    margin-top: auto !important;
  }

  & :nth-child(2) {
    margin-top: 0;
  }
`;

export const ChatMessageWrapper = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

export const ChatMessageYou = styled.p`
  color: #7c7c7c;
  text-align: right;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 1px;
`;

export const ChatMessageUsername = styled.p`
  color: #7c7c7c;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  margin-bottom: 1px;
`;

export const ChatUsernameBox = styled.span`
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  margin-bottom: 1px;

  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ChatMessageYouCloud = styled.div`
  position: relative;
  background-color: var(--accent-transparent-color);
  max-width: 65%;
  padding: 8px;
  padding-right: 16px;
  border-radius: 10px;
  margin-left: auto;
  font-size: 15px;
  line-height: 18px;

  @media screen and (orientation: landscape) {
    max-width: 230px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 230px;
  }
`;

export const ChatWindowedMessageYouCloud = styled(ChatMessageYouCloud)`
  max-width: 95%;
  font-size: 32px;
  line-height: 36px;

  @media screen and (orientation: landscape) {
    max-width: 95%;
  }

  @media screen and (min-width: 1280px) {
    max-width: 95%;
  }
`;

export const ChatMessageUserCloud = styled.div`
  position: relative;
  background-color: var(--main-transparent-color);
  max-width: 65%;
  padding: 8px;
  border-radius: 10px;
  font-size: 15px;
  line-height: 18px;

  @media screen and (orientation: landscape) {
    max-width: 230px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 230px;
  }
`;

export const ChatWindowedMessageUserCloud = styled(ChatMessageUserCloud)`
  max-width: 95%;
  font-size: 32px;
  line-height: 36px;

  @media screen and (orientation: landscape) {
    max-width: 95%;
  }

  @media screen and (min-width: 1280px) {
    max-width: 95%;
  }
`;

export const ChatMessagePinnedCloud = styled(ChatMessageUserCloud)`
  background-color: transparent;
  max-width: 95%;
`;

export const ChatMessageText = styled.p`
  word-wrap: break-word;
  white-space: normal;
  color: var(--chat-font-color);

  & > a {
    color: var(--link-color);
  }
`;

export const ChatWindowedMessageText = styled(ChatMessageText)`
  color: #ffffffdd;

  & > a {
    color: var(--accent-color);
  }
`;

export const ChatMessageTime = styled.p`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 11px;
  color: #00000081;
`;

export const ChatFooterBox = styled.div`
  width: 100%;
  padding: 10px;
  height: 5vh;
  min-height: 48px;
`;

export const ChatMessageForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

export const СhatMessageInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  padding: 8px;
  padding-right: 32px;

  font-family: var(--streams-secondary-font-family);
  font-weight: 500;
  font-size: 16px;

  word-wrap: break-word;
  white-space: normal;
  background-color: var(--chat-background-color);
  color: var(--chat-font-color);

  &::placeholder {
    user-select: none;

    color: var(--chat-font-color);
    font-size: 12px;
  }
`;

export const ChatWindowedMessageInput = styled(СhatMessageInput)`
  width: calc(100% - 54px);

  background-color: #0f0f0f;
  color: #ffffffdd;

  &::placeholder {
    color: #ffffffdd;
  }
`;

export const ChatSend = styled(ChatSendIcon)`
  width: 24px;
  height: 24px;
  fill: var(--accent-color);

  transition: fill var(--animation-global);
`;

export const СhatSendMessageButton = styled.button`
  background-color: var(--main-color);
  padding: 10px;
  border: none;
  border-radius: 50%;
  outline: none;
  color: #eae3d2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--animation-global),
    box-shadow var(--animation-global);

  &:hover,
  &:focus {
    box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);
  }

  &:hover > svg,
  &:focus > svg {
    fill: var(--chat-background-color);
  }
`;

export const ChatFastScrollButton = styled(СhatSendMessageButton)`
  position: absolute;
  bottom: 75px;
  z-index: 5;

  width: 36px;
  height: 36px;

  background-color: var(--main-semi-transparent-color);

  &:hover > svg,
  &:focus > svg {
    fill: none;
  }
`;

export const ChatScrollDownIcon = styled(ChatScrollDownArrow)`
  flex-shrink: 0;
  stroke-width: 2;
`;

export const ChatPinnedMessage = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 4px;

  margin-left: auto;
  margin-bottom: 8px;

  width: 100%;

  background-color: var(--pinned-message-color);

  border-radius: 10px;

  transition: all var(--animation-global);

  & div:last-child {
    margin-bottom: 0;
  }

  & > p {
    font-size: 12px;
    line-height: 14px;
    transition: font-size var(--animation-global);
  }

  & div {
    font-size: 15px;
    line-height: 18px;
    transition: font-size var(--animation-global);
  }

  &.minimized {
    width: 25px;
    height: 25px;

    right: 0;

    border-radius: 50%;

    & p,
    & div {
      font-size: 0px;
      margin: 0px;
      opacity: 0;
    }

    & svg {
      visibility: visible;
    }
  }
`;

export const ChatPinnedMessageIcon = styled(PinnedMessageIcon)`
  position: absolute;
  top: 2px;
  right: 1px;
  z-index: 5;

  width: 22px;
  height: 22px;

  fill: var(--pin-icon-fill);

  transition: transform var(--animation-global);

  &.minimized {
    transform: rotate(60deg);
  }
`;

export const ChatWindowedPinnedMessageIcon = styled(ChatPinnedMessageIcon)`
  top: 2px;
  right: 0;
  fill: var(--accent-color);
  transform: rotate(60deg);
  transition: transform var(--animation-global);

  &.pinned {
    transform: rotate(0deg);
  }
`;

export const ChatDeleteMessage = styled(DeleteUserMessageIcon)`
  position: absolute;
  top: 2px;
  right: 2px;

  width: 16px;
  height: 16px;

  color: #f9c8389e;

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;

export const ChatWindowedDeleteMessage = styled(DeleteMessageIcon)`
  position: absolute;
  top: 2px;
  right: 2px;

  width: 22px;
  height: 22px;

  fill: #f9c8389e;

  &:hover,
  &:focus {
    fill: var(--accent-color);
  }
`;

export const ChatWindowedDeleteYourMessage = styled(ChatWindowedDeleteMessage)`
  top: 2px;
  right: 22px;
`;

export const ChatWindowedBanUser = styled(BanUserIcon)`
  width: 12px;
  height: 12px;

  fill: #800000;

  &:hover,
  &:focus {
    fill: var(--accent-color);
  }
`;

export const EmojiPickerSwitch = styled(EmojiSwitchIcon)`
  width: 20px;
  height: 20px;

  position: absolute;
  top: 50%;
  right: 6px;

  transform: translateY(-50%);

  fill: var(--link-color);

  &:hover,
  &:focus {
    fill: var(--pinned-message-color);
  }
`;

export const ChatMessageLabel = styled.label`
  position: relative;
  width: 100%;
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 8px 12px;
`;

export const ChatHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;

  color: var(--chat-font-color);
  font-size: 12px;
  font-family: var(--streams-secondary-font-family);
`;

export const ChatHeaderLogo = styled(ChatLogo)`
  width: 20px;
  height: 20px;
`;

export const ToggleContainer = styled.div`
  width: max-content;
  transform: scale(0.7);
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 5vh;
  left: 4px;
  right: 14px;

  display: flex;
  justify-content: center;

  transition: all var(--animation-global);

  &.hidden {
    transform: translateY(-25%);

    overflow: hidden;
    opacity: 0;
    z-index: -2;
    pointer-events: none;
  }

  &.shown {
    transform: translateY(0);
    opacity: 1;
    z-index: 6;
  }
`;
