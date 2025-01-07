import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundSection = styled.section`
  min-height: 50vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--main-color);
`;

export const NotFoundTitle = styled.h1`
  margin: auto;
  color: var(--secondary-color);
  -webkit-text-stroke-color: var(--secondary-color);
`;

export const NotFoundLinkWrapper = styled.div`
  margin: 0 auto;
`;

export const NotFoundLinkTitle = styled.span`
  display: block;
  margin-bottom: 20px;

  font-family: var(--secondary-font-family);
  font-size: 18px;
  font-weight: 700;

  color: var(--accent-color);
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 768px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

export const NotFoundLinks = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const NotFoundLink = styled(Link)`
  padding: 8px 0;

  color: var(--secondary-color);
  text-decoration: none;
  text-align: center;
  transition: color var(--animation-global);

  &:first-child {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;
