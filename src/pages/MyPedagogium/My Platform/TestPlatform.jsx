import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BackgroundVideo,
  MyAPBackground,
  MyPlatformBox,
  TestLogo,
  TestPlatformSpoiler,
} from './MyPlatform.styled';

export const TestPlatform = ({ platformLink }) => {
  const [src, setSrc] = useState('https://online.ap.education/school/');
  const location = useLocation().search.slice(1);

  useEffect(() => {
    const setIframeSRC = () => {
      !platformLink && !location
        ? setSrc('https://online.ap.education/school/')
        : !location
        ? setSrc(platformLink)
        : setSrc(location);
    };

    setIframeSRC();
  }, [platformLink, location]);

  const removeVideo = () => {
    setTimeout(() => {
      document.querySelector('[title="AP Education"]').remove();
    }, 15000);
  };

  removeVideo();

  return (
    <MyAPBackground>
      <BackgroundVideo
        playsInline
        loop
        autoPlay
        muted
        src="https://www.ap.education/assets/video/Logo_Green.mp4"
        title="Pedagogium"
      />
      <TestPlatformSpoiler>
        <TestLogo />
      </TestPlatformSpoiler>
      <MyPlatformBox>
        <iframe
          id="platform-window"
          title="platform-pin"
          src={src}
          width="100%"
          height="100%"
          allow="microphone *"
        ></iframe>
      </MyPlatformBox>
    </MyAPBackground>
  );
};
