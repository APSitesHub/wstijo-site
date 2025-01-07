import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '../../../img/svg/month-switch-left.svg';
import { ReactComponent as ArrowRight } from '../../../img/svg/month-switch-right.svg';
import {
  CalendarBtnIcon,
  TimetableBtnIcon,
} from '../MyPedagogiumPanel/MyPedagogiumPanel.styled';

export const AttendanceBox = styled.div`
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
    height: auto;
  }

  @media screen and (min-height: 640px) {
    top: 142px;
    overflow-y: hidden;
  }
`;

export const AttendanceHeading = styled.h3`
  padding: 9px 0;

  color: #525266;
  border-bottom: 1px solid #0000000d;
  margin-bottom: -1px;
  font-size: 20px;
  font-weight: 400;

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CalendarIcon = styled(TimetableBtnIcon)``;

export const AttendanceIcon = styled(CalendarBtnIcon)``;

export const AttendanceVisitedBox = styled.div`
  padding: 7px 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 360px) {
    padding: 11px 6px;
  }

  @media screen and (min-width: 480px) {
    padding: 18px 10px;
  }
`;

export const MonthSwitchBox = styled.div`
  display: flex;
  width: fit-content;
  gap: 2px;
  align-items: center;

  padding: 3px 3px;
  border-radius: 6px;
  background: linear-gradient(
      322deg,
      var(--main-color) 23.22%,
      var(--secondary-color) 110.11%
    ),
    #fff;
`;

export const AttendancePeriod = styled.span`
  color: var(--secondary-color);
  font-size: 12px;

  min-width: 70px;
  text-align: center;
  width: max-content;

  text-transform: capitalize;

  @media screen and (min-width: 360px) {
    font-size: 13px;
  }

  @media screen and (min-width: 480px) {
    font-size: 14px;
  }
`;

export const AttendanceBtn = styled.button`
  width: 16px;
  height: 16px;

  position: relative;

  border: none;
  outline: transparent;
  background-color: transparent;

  &:not(:disabled),
  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover svg,
  &:not(:disabled):focus svg {
    color: var(--accent-color);
  }
`;

export const AttendanceArrowLeft = styled(ArrowLeft)`
  color: #ffffff59;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  transition: color var(--animation-global), filter var(--animation-global);

  &.available {
    color: var(--secondary-color);
  }
`;

export const AttendanceArrowRight = styled(ArrowRight)`
  color: #ffffff59;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  transition: color var(--animation-global), filter var(--animation-global);

  &.available {
    color: var(--secondary-color);
  }
`;

export const VisitedList = styled.ul`
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin: -1px;
  padding: 0 8px;
  font-size: 12px;

  @media screen and (min-width: 360px) {
    font-size: 13px;
  }

  @media screen and (min-width: 480px) {
    font-size: 14px;
  }

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const VisitedItem = styled.li`
  padding: 10px 0;
  display: flex;
  gap: 8px;
`;

export const VisitedText = styled.span``;

export const VisitedCounter = styled.span``;

export const VisitedTotal = styled.span`
  color: var(--main-color);
`;

export const VisitedYearBox = styled.div`
  padding: 10px 8px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;

  @media screen and (min-width: 360px) {
    font-size: 13px;
  }

  @media screen and (min-width: 480px) {
    font-size: 14px;
  }
`;

export const AttendancePointsBox = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AttendanceFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AttendancePoints = styled.div`
  position: relative;
`;

export const AttendancePointsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);

  @media screen and (min-width: 360px) {
    gap: 4px;
  }

  @media screen and (min-width: 480px) {
    gap: 8px;
  }
`;

export const AttendanceDebugList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
