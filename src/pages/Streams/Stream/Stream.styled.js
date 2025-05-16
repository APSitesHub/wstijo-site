import styled from 'styled-components';

export const PlayerWrapper = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const JitsiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: none;
`;

export const GradientBackground = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #0f645b, black, #0f645b);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LargeText = styled.p`
  font-size: 4rem;
  font-weight: bold;
  margin: auto;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;