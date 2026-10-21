import Blockquote from '@/components/blockquote';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Info from '../../info';
import Logo from '../../logo';
import './index.less';

const Idle = memo(() => (
  <div className='Idle'>
    <div className='w-full pt-[5%]'>
      <div className='relative flex w-full items-start justify-center overflow-y-hidden'>
        <div className='relative w-full max-w-md'>
          <Blockquote className='items-start justify-between'>
            <Info shouldFadeIn isReverse />
            <Logo shouldFadeIn className='mt-6' />
            <div className='opacity-0' />
          </Blockquote>
          <div className='flex w-full flex-col items-center justify-center gap-2'>
            <Blockquote>
              <div className={twMerge('headline', 'headline-0')} />
            </Blockquote>
            <Blockquote className='justify-center'>
              <div className={twMerge('subline', 'subline-0')} />
            </Blockquote>
            <Blockquote className='-mb-2 justify-center pt-8'>
              <div className={twMerge('idle', 'idle-0')} />
            </Blockquote>
            <div className='fast-pass' />
          </div>
        </div>
      </div>
    </div>
  </div>
));
export default Idle;
