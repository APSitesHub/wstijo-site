import styled from 'styled-components';

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const OffsetLoaderWrapper = styled(LoaderWrapper)`
  top: 70%;
`;

export const VideoLoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  font-family: var(--main-font-family);

  overflow: hidden;
  padding: 75px 20px;
  padding-top: 50px;
  background-color: white;

  @media screen and (min-width: 768px) {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const VideoLoader = styled.video`
  width: calc(100% - 40px);

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;


