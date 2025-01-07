import styled from 'styled-components';
import { TimetableBtnIcon } from '../MyPedagogiumPanel/MyPedagogiumPanel.styled';

export const TimetableBox = styled.div`
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
  height: auto;
  overflow-y: scroll;
  width: calc(100% - 65px);

  @media screen and (min-width: 480px) {
    width: 362px;
  }

  @media screen and (min-width: 768px) {
    right: 90px;
  }

  @media screen and (min-height: 480px) {
    top: 60px;
    height: 400px;
  }

  @media screen and (min-height: 640px) {
    top: 142px;
    height: auto;
    overflow-y: hidden;
  }
`;

export const TimetableHeading = styled.h3`
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

export const TimetableIcon = styled(TimetableBtnIcon)``;

export const TimetableBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 21px;

  font-size: 14px;
  line-height: 1.2;
  color: #525266;
`;

export const TimetableWebinars = styled.div`
  position: relative;

  @media screen and (max-width: 389px) {
    padding-top: 5px;
    padding-bottom: 20px;
  }
`;

export const TimetableWebinarsHelmet = styled.ul`
  display: flex;
  justify-content: space-between;
`;

export const TimetableWebinarsHelmetItem = styled.li`
  color: #bebecc;
`;

export const TimetableWebinarsHelmetText = styled.span`
  display: block;
  font-size: 12px;
`;

export const TimetableWebinarsHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px;

  border-bottom: 1px solid var(--accent-color);
`;

export const TimetableSpeakings = styled.div`
  @media screen and (max-width: 389px) {
    padding-bottom: 5px;
  }
`;

export const TimetableLessonType = styled.span`
  display: block;
`;

export const TimetableLessonLink = styled.a`
  display: block;
  padding: 5px 0;
  height: 36px;

  position: relative;

  text-align: center;
  text-decoration: none;
  width: 110px;
  color: #fff;
  font-weight: 500;
  background: linear-gradient(
      322deg,
      var(--main-color) 23.22%,
      var(--secondary-color) 110.01%
    ),
    var(--secondary-color);

  border-radius: 5px;
  overflow: hidden;

  transition: all var(--animation-global);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    transition: opacity var(--animation-global);

    background: linear-gradient(
        322deg,
        var(--main-color) 23.22%,
        var(--secondary-color) 110.01%
      ),
      var(--secondary-color);
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }
`;

export const TimetableLessonLinkText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;

  transform: translate(-50%, -50%);
`;

export const TimetableTable = styled.table`
  width: 100%;
  max-width: 331px;
  table-layout: auto;
  border-collapse: collapse;
  text-align: center;
`;

export const TimetableHead = styled.th`
  color: #bebecc;
  font-size: 12px;
  font-weight: 400;
  padding: 6px 0;

  &.day {
    width: 37px;
  }
  &.time {
    width: 105px;
  }
  &.lessonNumber {
    width: 66px;
  }
  &.teacher {
  }
`;

export const TimetableDaysItem = styled.tr`
  height: 36px;
  /* clip-path: xywh(0 0 100% 100% round 7px); */
`;

export const TimetableDaysCell = styled.td`
  border: none;
`;
