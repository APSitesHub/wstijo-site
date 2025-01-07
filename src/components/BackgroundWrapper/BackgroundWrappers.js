import styled from 'styled-components';
import desktop1xBGPng from '../../img/bg/desktop-bg@1x-480x480.png';
import desktop1xBGWebp from '../../img/bg/desktop-bg@1x-480x480.webp';

export const BackgroundWrapper = styled.div`
  background-position: right -70px top 640px;
  background-image: image-set(
    url(${desktop1xBGWebp}) type('image/webp'),
    url(${desktop1xBGPng}) type('image/png')
  );
  background-size: 364px 359px;
  background-repeat: no-repeat;

  @media (min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background-image: image-set(
      url(${desktop1xBGWebp}) type('image/webp'),
      url(${desktop1xBGPng}) type('image/png')
    );
  }

  @media screen and (min-width: 768px) {
    background-position: center top 785px;
    background-image: image-set(
      url(${desktop1xBGWebp}) type('image/webp'),
      url(${desktop1xBGPng}) type('image/png')
    );
    background-size: 562px 554px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${desktop1xBGWebp}) type('image/webp'),
        url(${desktop1xBGPng}) type('image/png')
      );
    }
  }

  @media screen and (min-width: 1280px) {
    background-position: left -215px top 725px;
    background-image: image-set(
      url(${desktop1xBGWebp}) type('image/webp'),
      url(${desktop1xBGPng}) type('image/png')
    );
    background-size: 760px 750px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${desktop1xBGWebp}) type('image/webp'),
        url(${desktop1xBGPng}) type('image/png')
      );
    }
  }
`;

export const StreamsBackgroundWrapper = styled.div`
  font-family: var(--new-font-family);

  height: 100vh;
  background-position: center top 0px;

  background-size: auto 50%;
  background-repeat: no-repeat;

  @media (min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
  }

  @media screen and (min-width: 768px) {
    background-position: center top 0px;

    background-size: auto 50%;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
    }
  }

  @media screen and (min-width: 1280px) {
    background-position: center top 0;

    background-size: auto 50%;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
    }
  }
`;
