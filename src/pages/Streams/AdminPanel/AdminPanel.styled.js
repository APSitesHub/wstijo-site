import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Form } from 'formik';
import styled from 'styled-components';

export const AdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: var(--new-font-family);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;

export const LinksForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

export const LinksFieldGroup = styled.div`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const LinksFieldGroupTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
  max-width: 600px;
`;

export const AdminInput = styled(Input)`
  font-family: var(--new-font-family);
  border: 2px solid var(--main-color);
  max-width: 600px;
`;

export const AdminInputNote = styled(InputNote)`
  position: static;
  color: var(--main-color);
  font-size: 14px;
  bottom: -1.1em;
`;
