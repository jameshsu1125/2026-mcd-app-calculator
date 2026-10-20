import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useRef, useState } from 'react';
import { IntroContext, IntroStepType } from '../config';
import './index.less';

const Color = memo(() => {
  const [state] = useContext(IntroContext);

  return (
    <TweenerDivProvider
      className='absolute top-0 h-full w-full bg-black'
      initialStyle={{ backgroundColor: '#000' }}
      tweenTo={{ backgroundColor: '#ffbc0d' }}
      options={{ duration: 15000, easing: Bezier.inCirc, onEnd: () => {} }}
      shouldFadeIn={state.step === IntroStepType.fadeIn}
    />
  );
});

const Glow = memo(() => {
  const [state, setState] = useContext(IntroContext);
  const timeRef = useRef(new Date().getTime());

  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  return (
    <TweenerDivProvider
      className='glow mix-blend-lighten'
      initialStyle={{ opacity: 0, scale: 1, y: 0, x: 0 }}
      tweenTo={{ opacity: 1, scale: 2 }}
      options={{
        duration: 15000,
        easing: Bezier.inQuart,
        onStart: () => {
          timeRef.current = new Date().getTime();
        },
        onUpdate: () => {
          const now = new Date().getTime();
          const delta = now - timeRef.current;
          if (delta < 14000) return;
          setShouldFadeOut(true);
        },
      }}
      shouldFadeIn={state.step === IntroStepType.fadeIn}
      fadeOutStyle={{ opacity: 1, scale: 2.5, y: -200, x: 100 }}
      optionsFadeOut={{
        duration: 800,
        easing: Bezier.inOutQuart,
        onStart: () => {
          setState((prev) => ({ ...prev, shouldEndFadeIn: true }));
        },
      }}
      shouldFadeOut={shouldFadeOut}
      tweenQueue={[{ opacity: 0, y: -window.innerHeight }]}
      shouldUseTweenQueue={state.step === IntroStepType.patternDidFadeIn}
      tweenQueueOptions={{
        duration: 300,
        easing: Bezier.inBack,
      }}
    />
  );
});

const Background = memo(() => (
  <div className='absolute top-0 h-full w-full'>
    <Color />
    <Glow />
  </div>
));
export default Background;
