import axios from 'axios';
import {
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizSubmitBtnOptions,
} from './StudentInput.styled';

export const StudentTrueFalse = ({
  isInputOpen,
  socket,
  page,
  toggleQuiz,
  currentUser,
  questionID,
}) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const answer = e.target.innerText;
    toggleQuiz();

    socket.emit('answer:given', {
      answer: answer,
      page: page,
    });

    await axios.post('/answers', {
      answer: answer,
      username: currentUser.name,
      page: page,
      socketID: socket.id,
      questionID: questionID,
      userID: currentUser.id,
    });
  };

  return (
    <StudentQuizBox className={isInputOpen ? 'shown' : 'hidden'}>
      <StudentQuizForm>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          True
        </StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          False
        </StudentQuizSubmitBtnOptions>
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
