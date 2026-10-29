import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { INTRO_SPEED, IntroContext, IntroStepType } from '../config';
import './index.less';

const Frame = memo(() => {
  const [{ step }, setState] = useContext(IntroContext);

  return (
    <div
      className={twMerge(
        'relative h-full w-full',
        step === IntroStepType.frameDidFadeIn && 'animate-blank',
      )}
    >
      <TweenerDivProvider
        className='frame'
        initialStyle={{ opacity: 0 }}
        tweenTo={{ opacity: 1 }}
        shouldFadeIn={step === IntroStepType.frameDidBlanking}
        options={{
          duration: 2000 * INTRO_SPEED,
          easing: Bezier.inOutQuart,
          onEnd: () => {
            setState((S) => ({ ...S, step: IntroStepType.frameDidFadeIn }));
          },
        }}
        tweenQueue={[...new Array(8).keys()].map((i) => ({
          opacity: i % 2 === 0 ? Math.random() * 0.2 : 0,
        }))}
        shouldUseTweenQueue={step === IntroStepType.fadeIn}
        tweenQueueOptions={{
          duration: 50 * INTRO_SPEED,
          easing: Bezier.linear,
          onEnd: () => {
            setState((S) => ({ ...S, step: IntroStepType.frameDidBlanking }));
          },
        }}
      />
    </div>
  );
});
export default Frame;
