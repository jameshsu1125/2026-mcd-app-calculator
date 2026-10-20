import { memo, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import './close.less';

const Close = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='close'>
      <IoClose className='h-5 w-5' />
    </div>
  );
});
export default Close;
