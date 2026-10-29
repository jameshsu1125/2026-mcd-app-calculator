import TweenerDivProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { ResultContext, ResultStepType } from '../config';
import { Char } from './config';
import './idles.less';

const Idles = memo(({ idleType }: { idleType: 0 | 1 | 2 | -1 | 4 | 3 | 5 }) => {
  const [{ step }] = useContext(ResultContext);

  return (
    <div className={twMerge('idle', `idle-${idleType}`)}>
      {idleType >= 0 ? (
        <TweenerDivProvider
          initialStyle={Char[idleType].initialStyle}
          tweenTo={Char[idleType].tweenTo}
          shouldFadeIn={step === ResultStepType.fadeIn}
          options={Char[idleType].options}
        >
          <div className='body' />
          <div className='left-hand' />
          <div className='right-hand' />
          <div className='left-eye' />
          <div className='right-eye' />
          <div className='item' />
        </TweenerDivProvider>
      ) : (
        <div />
      )}
      {/*<Item index={IdleType} />
      <Effect index={IdleType} /> */}
    </div>
  );
});
export default Idles;
