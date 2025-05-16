import styled from 'styled-components';

export const StudentQuizBox = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  z-index: 15;

  height: 160px;
  width: 320px;
  border-radius: 25px;

  transform: translate(-50%, -50%);
  overflow: hidden;

  background-color: #fff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;

export const StudentQuizForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 12px;
`;

export const StudentQuizBoxInput = styled.input`
  padding: 12px;
  height: 40px;
  width: 85%;

  border-radius: 50px;
  border: 2px solid #0f645b;
`;

export const StudentQuizSubmitBtn = styled.button`
  height: 40px;
  width: 85%;

  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.6px;

  border-radius: 50px;
  border: transparent;
  background: radial-gradient(70% 80% at -13.25% 26%, #0f645b 6.9%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(70% 80% at 113.25% 74%, #0f645b 6.9%, rgba(0, 0, 0, 0) 100%), #000;
`;

export const StudentQuizBoxInputNote = styled.p`
  color: red;
  font-size: 14px;
`;

export const StudentQuizSubmitBtnOptions = styled(StudentQuizSubmitBtn)`
  background: none;
  color: #000;
  border: 2px solid #0f645b;
`;
