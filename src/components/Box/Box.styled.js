import styled from 'styled-components';

export const Box = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

export const BoxNew = styled.div`
  max-width: 1920px;
  margin: 0 auto;

  @media screen and (min-width: 1280px) {
    display: flex;
    align-items: center;
    gap: 120px;
  }
`;

export const BoxSchool = styled(BoxNew)`
  @media screen and (min-width: 1280px) {
    flex-direction: row-reverse;
  }
`;
