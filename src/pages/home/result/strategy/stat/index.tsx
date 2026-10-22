import { memo, useEffect } from 'react';
import './index.less';

const Stat = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Stat'>
      <div>
        <div className='title' />
        <div className='count'>148</div>
      </div>
      <div>
        <div className='title' />
        <div className='count'>8</div>
      </div>
      <div>
        <div className='title' />
        <div className='count'>3</div>
      </div>
    </div>
  );
});
export default Stat;
