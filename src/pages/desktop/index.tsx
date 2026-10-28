import { memo, useEffect } from 'react';
import './index.less';

const Desktop = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Desktop'>
      <div className='glow' />
      <div className='bg' />
      <div className='ctx'>
        <div className='flex w-full flex-col items-center justify-center gap-10'>
          <div className='welcome' />
          <div className='flex w-[1024px] justify-center'>
            <div className='pattern'>
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Desktop;
