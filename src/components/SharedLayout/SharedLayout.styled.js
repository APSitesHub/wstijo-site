import { Title } from 'components/Hero/Hero.styled';
import styled from 'styled-components';
import { Loader } from './Loaders/Loader';

export const SuspenseBox = styled.div`
  position: relative;
  height: 50vh;
  padding-top: 120px;
`;

export const SuspenseTitle = styled(Title)`
  position: absolute;
  font-family: var(--new-font-family);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SuspenseLoader = styled(Loader)`
  top: 80%;
`;
