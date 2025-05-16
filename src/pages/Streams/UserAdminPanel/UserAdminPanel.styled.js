import styled from 'styled-components';
import { ReactComponent as _ArrowDownIcon } from '../../../img/svg/invertedDownArrow.svg';

export const AdminPanelSection = styled.section`
  height: max-content;
  min-height: 100vh;
  padding: 30px 20px;
  display: flex;
  align-items: flex-start;

  gap: 30px;
`;

export const UserDBTable = styled.table`
  max-width: 50vw;
  min-height: 80vh;
  margin: 0 auto;

  table-layout: auto;
  width: 100%;

  text-align: center;
  border: 1px solid #000;
  border-collapse: collapse;
`;

export const UserDBCaption = styled.caption`
  caption-side: top;
  margin-bottom: 20px;
`;

export const UserDBRow = styled.tr`
  border: 1px solid #000;
`;

export const UserHeadCell = styled.th`
  border: 1px solid #000;
  padding: 3px;
`;

export const UserCell = styled.td`
  border: 1px solid #000;
  padding: 3px;
  height: 3em;

  &.last-name {
    text-transform: capitalize;
  }

  &.attention {
    color: red;
  }

  &.error {
    background-color: #ff0000;
  }
`;

export const ArrowDownIcon = styled(_ArrowDownIcon)`
  width: 12px;
  height: 12px;
  cursor: pointer;

  color: #000;

  &:hover {
    color: var(--main-color);
  }
`;

export const DatesEditBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;

  background-color: white;
  padding: 24px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;
