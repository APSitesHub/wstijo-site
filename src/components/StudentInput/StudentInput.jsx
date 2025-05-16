import { useState } from 'react';
import {
  StudentQuizBox,
  StudentQuizBoxInput,
  StudentQuizBoxInputNote,
  StudentQuizForm,
  StudentQuizSubmitBtn,
} from './StudentInput.styled';
import axios from 'axios';

export const StudentInput = ({
  isInputOpen,
  socket,
  page,
  toggleQuiz,
  currentUser,
  questionID,
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async e => {
    if (!document.querySelector('#answer_input').value) {
      setIsValid(false);
      return;
    }

    const answer = document
      .querySelector('#answer_input')
      .value.trim()
      .trimEnd()
      .toLowerCase();
    e.preventDefault();

    document.querySelector('#answer_input').value = '';
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

  //   const handleOnDrag = e => {
  //     var pos1 = 0,
  //       pos2 = 0,
  //       pos3 = 0,
  //       pos4 = 0;
  //     if (document.getElementById('mydivheader')) {
  //       /* if present, the header is where you move the DIV from:*/
  //       document.getElementById('mydivheader').onmousedown = dragMouseDown;
  //     } else {
  //       /* otherwise, move the DIV from anywhere inside the DIV:*/
  //       e.target.onmousedown = dragMouseDown;
  //     }

  //     function dragMouseDown(e) {
  //       e = e || window.event;
  //       e.preventDefault();
  //       // get the mouse cursor position at startup:
  //       pos3 = e.clientX;
  //       pos4 = e.clientY;
  //       document.onmouseup = closeDragElement;
  //       // call a function whenever the cursor moves:
  //       document.onmousemove = elementDrag;
  //     }

  //     function elementDrag(e) {
  //       e = e || window.event;
  //       e.preventDefault();
  //       // calculate the new cursor position:
  //       pos1 = pos3 - e.clientX;
  //       pos2 = pos4 - e.clientY;
  //       pos3 = e.clientX;
  //       pos4 = e.clientY;
  //       // set the element's new position:
  //       e.target.style.top = e.target.offsetTop - pos2 + 'px';
  //       e.target.style.left = e.target.offsetLeft - pos1 + 'px';
  //     }

  //     function closeDragElement() {
  //       /* stop moving when mouse button is released:*/
  //       document.onmouseup = null;
  //       document.onmousemove = null;
  //     }
  //   };

  return (
    <StudentQuizBox
      className={isInputOpen ? 'shown' : 'hidden'}
      //   draggable={true}
      //   onDrag={handleOnDrag}
      //   onTouchMove={handleOnDrag}
    >
      <StudentQuizForm>
        <StudentQuizBoxInput
          type="text"
          id="answer_input"
          placeholder="Write your answer"
          required
          onChange={e => {
            return e.target.value && setIsValid(true);
          }}
        />
        <StudentQuizSubmitBtn onClick={e => handleSubmit(e)}>
          Send
        </StudentQuizSubmitBtn>
        {!isValid && (
          <StudentQuizBoxInputNote>Answer is required</StudentQuizBoxInputNote>
        )}
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
