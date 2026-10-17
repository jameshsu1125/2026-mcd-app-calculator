import { memo } from 'react';
import Frame from './frame';
import './index.less';
import UpperText from './upperText';

const FastPass = memo(() => {
  return (
    <div className='FastPass'>
      <div className='inner'>
        <Frame />
        <UpperText />
        {/* <div className='lower-text' /> */}
      </div>
    </div>
  );
});
export default FastPass;
