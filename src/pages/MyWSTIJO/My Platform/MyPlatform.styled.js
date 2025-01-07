
import styled from 'styled-components';

export const MyPlatformBox = styled.div`
  height: 100vh;
  width: 100vw;

  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;

  font-family: var(--streams-font-family);

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(-100%);
  }

  &.shown {
    transform: translateX(0);
  }
`;

export const TestPlatformSpoiler = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100% - 17.5px);
  height: 64px;
  z-index: 5;

  background-color: white;
`;

export const MyAPBackground = styled.div`
  width: 100%;
  height: 100%;
`;

export const BackgroundVideo = styled.video`
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: cover;

  width: 100%;
  height: calc(100% - 64px);
`;
