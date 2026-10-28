import { memo, useEffect } from 'react';
import './copy.less';
import { PiCopyBold } from 'react-icons/pi';

const Copy = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='copy'>
      <PiCopyBold className='h-6 w-6' />
    </div>
  );
});
export default Copy;
