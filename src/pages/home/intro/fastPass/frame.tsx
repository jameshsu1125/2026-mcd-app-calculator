import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext, useEffect } from 'react';
import { IntroContext, IntroStepType } from '../config';
import './index.less';
import { Bezier } from 'lesca-use-tween';
import { twMerge } from 'tailwind-merge';

const Frame = memo(() => {
  const [{ step }, setState] = useContext(IntroContext);

  return (
    <div
      className={twMerge(
        'relative h-full w-full',
        step === IntroStepType.frameDidFadeIn && 'animate-blank',
      )}
    >
      <TweenerProvider
        className='frame'
        initialStyle={{ opacity: 0 }}
        tweenTo={{ opacity: 1 }}
        shouldFadeIn={step === IntroStepType.frameDidBlanking}
        options={{
          duration: 2000,
          easing: Bezier.inOutQuart,
          onEnd: () => {
            setState({ step: IntroStepType.frameDidFadeIn });
          },
        }}
        tweenQueue={[...new Array(30).keys()].map((i) => ({
          opacity: i % 2 === 0 ? Math.random() * 0.2 : 0,
        }))}
        shouldUseTweenQueue={step === IntroStepType.fadeIn}
        tweenQueueOptions={{
          duration: 50,
          easing: Bezier.linear,
          onEnd: () => {
            setState({ step: IntroStepType.frameDidBlanking });
          },
        }}
      />
    </div>
  );
});
export default Frame;
