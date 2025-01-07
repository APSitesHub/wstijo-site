import { ColorRing } from 'react-loader-spinner';
import { OffsetLoaderWrapper } from './Loader.styled';

export const OffsetLoader = () => {
  return (
    <OffsetLoaderWrapper>
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#0f645b', '#0B4943', '#073D37', '#0B4943', '#0f645b']}
      />
    </OffsetLoaderWrapper>
  );
};
