import { memo, useEffect } from 'react';
import './index.less';
import Contain from '@/components/contain';
import Blockquote from '@/components/blockquote';
import Info from '../../info';
import Logo from '../../logo';
import { twMerge } from 'tailwind-merge';

const Idle = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Idle'>
      <div className='w-full pt-[5%]'>
        <Contain maxWidth='max-w-md'>
          <Blockquote className='items-start justify-between'>
            <Info shouldFadeIn isReverse />
            <Logo shouldFadeIn className='mt-6' />
            <div className='opacity-0' />
          </Blockquote>
          <div className='flex w-full flex-col items-center justify-center gap-2'>
            <Blockquote className='items-start justify-center'>
              <div className={twMerge('headline', 'headline-0')} />
            </Blockquote>
            <Blockquote className='items-start justify-center'>
              <div className={twMerge('subline', 'subline-0')} />
            </Blockquote>
          </div>
        </Contain>
      </div>
    </div>
  );
});
export default Idle;
