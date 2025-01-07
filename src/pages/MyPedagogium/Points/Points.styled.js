import styled from 'styled-components';

export const PointsBox = styled.div`
  position: absolute;
  top: 30px;
  right: 60px;
  z-index: 5;

  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  font-family: var(--my-ap-font-family);

  overflow: hidden;
  border-radius: 20px;
  padding: 0 20px;
  padding-bottom: 10px;
  height: 440px;
  overflow-y: scroll;
  width: calc(100% - 65px);

  @media screen and (min-width: 480px) {
    width: 362px;
  }

  @media screen and (min-width: 768px) {
    right: 90px;
  }

  @media screen and (min-height: 320px) {
    height: 280px;
  }

  @media screen and (min-height: 480px) {
    top: 60px;
    height: 400px;
  }

  @media screen and (min-height: 640px) {
    top: 142px;
    height: 450px;
  }

  @media screen and (min-height: 960px) {
    height: 556px;
    overflow-y: hidden;
  }
`;

export const PointsBoxHeading = styled.h3`
  padding: 9px 0;

  color: #525266;
  border-bottom: 1px solid #0000000d;
  font-size: 20px;
  font-weight: 400;

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PointsCategoryPicker = styled.div`
  padding: 5px 0;

  position: relative;

  font-size: 14px;

  display: flex;

  margin-bottom: 6px;

  &::after {
    content: '';
    height: 2px;
    width: 100%;
    border-radius: 2px;
    background-color: #eeeef0;

    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const PointsCategory = styled.p`
  font-size: 14px;
  text-align: center;
  width: 50%;
  color: #bebecc;

  transition: color var(--animation-global);

  cursor: pointer;

  &.active,
  &:hover,
  &:focus {
    color: #525266;
  }
`;

export const PointsCategoryPointer = styled.div`
  height: 2px;
  width: 50%;
  border-radius: 2px;
  background-color: var(--main-color);

  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;

  transition: transform 250ms var(--animation-global);
`;

export const PointsTableHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 6px 5px 6px 0;
`;

export const PointsTableHeadItem = styled.p`
  font-size: 12px;
  color: #bebecc;
`;

export const PointsTableHeadItemWide = styled(PointsTableHeadItem)`
  width: 100%;
`;

export const PointsUser = styled(PointsTableHead)`
  height: 36px;
  border-radius: 7px;
  flex-shrink: 0;
  background-color: var(--accent-color);

  margin-bottom: 4px;
`;

export const PointsUserData = styled(PointsTableHeadItem)`
  flex-shrink: 0;

  width: 33px;
  font-size: 14px;
  text-align: center;
  color: #525266;
`;

export const PointsUserDataWide = styled(PointsUserData)`
  width: 100%;
  flex-shrink: 1;
  text-align: left;
`;

export const PointsLeaderboard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PointsLeader = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 1.5px 5px 1.5px 0;
`;

export const LeaderPlace = styled.div`
  display: flex;
  height: 33px;
  width: 33px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--secondary-color);
  border-radius: 5px;
  background: linear-gradient(
    322deg,
    var(--main-color) -5.61%,
    var(--secondary-color) 93.88%
  );
`;

export const UserPlace = styled(LeaderPlace)`
  color: #525266;
  background: transparent;
`;

export const PointsPlaceHolder = styled.div`
  display: flex;
  padding: 20px 0;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PointsPlaceHolderText = styled.p`
  font-size: 20px;
  color: #525266;
  text-align: center;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const EyesEmoji = styled.img`
  display: block;
  pointer-events: none;
  margin-bottom: 20px;
`;
