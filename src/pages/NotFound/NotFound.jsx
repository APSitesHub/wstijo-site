import {
  NotFoundLink,
  NotFoundLinkTitle,
  NotFoundLinkWrapper,
  NotFoundLinks,
  NotFoundSection,
  NotFoundTitle,
} from './NotFound.styled';

const NotFound = () => {
  return (
    <NotFoundSection id="hero">
      <NotFoundTitle>No such page!</NotFoundTitle>
      <NotFoundLinkWrapper>
        <NotFoundLinkTitle>Try something else!</NotFoundLinkTitle>
        <NotFoundLinks>
          <NotFoundLink to="/">Main</NotFoundLink>
        </NotFoundLinks>
      </NotFoundLinkWrapper>
    </NotFoundSection>
  );
};

export default NotFound;
