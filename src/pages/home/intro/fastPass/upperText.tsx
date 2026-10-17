import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { IntroContext, IntroStepType } from '../config';
import './index.less';
import { Bezier } from 'lesca-use-tween';

const UpperText = memo(() => {
  const [{ step }] = useContext(IntroContext);
  return (
    <TweenerProvider
      className='UpperText'
      initialStyle={{ opacity: 0 }}
      tweenTo={{ opacity: 1 }}
      shouldFadeIn={step === IntroStepType.frameDidBlanking}
      options={{ duration: 5000, easing: Bezier.outQuart, delay: 500 }}
    >
      {[...new Array(8).keys()].map((i) => (
        <div
          key={i}
          className={twMerge('animate-blank')}
          style={{ animationDelay: `-${Math.random() * 2}s` }}
        >
          <div />
        </div>
      ))}
    </TweenerProvider>
  );
});
export default UpperText;
