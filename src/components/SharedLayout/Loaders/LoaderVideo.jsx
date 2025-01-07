import {
  VideoLoader,
  VideoLoaderFilterBottom,
  VideoLoaderFilterTop,
  VideoLoaderWrapper,
} from './Loader.styled';

export const LoaderVideo = () => {
  return (
    <VideoLoaderWrapper>
      <VideoLoaderFilterTop />
      <VideoLoaderFilterBottom />
      <VideoLoader
        src="https://ap.education/static/video/quiz/loader-video.mp4"
        loop
        controls={false}
        autoPlay={true}
        playsInline
        muted={true}
      ></VideoLoader>
    </VideoLoaderWrapper>
  );
};
