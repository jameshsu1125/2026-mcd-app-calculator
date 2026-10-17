import TweenerProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useState } from 'react';
import { END_STAY_DURATION, IntroContext, IntroStepType } from '../config';
import { HomeContext, HomeStepType, HomePage } from '../../config';

const CheckBox = memo(() => {
  const [{ shouldEndFadeIn, shouldCheckFadeIn }, setState] = useContext(IntroContext);

  const [resume, setResume] = useState(false);

  return (
    <TweenerProvider
      initialStyle={{ scaleX: 1, scaleY: 1 }}
      tweenTo={{ scaleX: 1.5, scaleY: 0.5 }}
      shouldFadeIn={shouldEndFadeIn}
      options={{
        duration: 150,
        easing: Bezier.outQuart,
        delay: 1300,
        onEnd: () => {
          setState((prev) => ({ ...prev, shouldCheckFadeIn: true }));
        },
      }}
      fadeOutStyle={{ scaleX: 0.5, scaleY: 1.5 }}
      shouldFadeOut={shouldCheckFadeIn}
      optionsFadeOut={{
        duration: 150,
        easing: Bezier.outQuart,
        onEnd: () => {
          setResume(true);
        },
      }}
      tweenQueue={[{ scaleX: 1, scaleY: 1 }]}
      shouldUseTweenQueue={resume}
      tweenQueueOptions={{
        duration: 150,
        onEnd: () => {
          setTimeout(() => {
            setState((prev) => ({ ...prev, step: IntroStepType.patternDidFadeIn }));
          }, END_STAY_DURATION);
        },
      }}
    />
  );
});

const Glass = memo(() => {
  const [{ shouldEndFadeIn }] = useContext(IntroContext);

  return (
    <TweenerProvider
      initialStyle={{ y: -20 }}
      tweenTo={{ y: 0 }}
      shouldFadeIn={shouldEndFadeIn}
      options={{ duration: 300, delay: 950, easing: Bezier.outBack }}
    />
  );
});

const Check = memo(() => {
  const [{ shouldCheckFadeIn }] = useContext(IntroContext);
  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, scale: 0 }}
      tweenTo={{ opacity: 1, scale: 1 }}
      shouldFadeIn={shouldCheckFadeIn}
      options={{ duration: 150, easing: Bezier.outBack }}
    />
  );
});

const Pattern = memo(() => {
  const [{ shouldEndFadeIn, step }] = useContext(IntroContext);
  const [, setState] = useContext(HomeContext);
  return (
    <TweenerProvider
      className='pattern'
      initialStyle={{ opacity: 0, y: 200, scaleX: 1, scaleY: 1 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{ duration: 800, delay: 100, easing: Bezier.inOutQuart }}
      shouldFadeIn={shouldEndFadeIn}

      fadeOutStyle={{ opacity: 0, y: -200, scaleX: 0.5, scaleY: 1.5 }}
      shouldFadeOut={step === IntroStepType.patternDidFadeIn}
      optionsFadeOut={{
        duration: 300,
        easing: Bezier.inBack,
        delay: 100,
        onEnd: () => {
          setState((prev) => ({ ...prev, page: HomePage.calculator }));
        },
      }}
    >
      <div />
      <Glass />
      <CheckBox />
      <Check />
    </TweenerProvider>
  );
});
export default Pattern;
