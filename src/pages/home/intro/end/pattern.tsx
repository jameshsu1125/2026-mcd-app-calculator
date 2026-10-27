import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useState } from 'react';
import { HomeContext, HomePageType } from '../../config';
import { END_STAY_DURATION, IntroContext, IntroStepType } from '../config';

const CheckBox = memo(() => {
  const [{ shouldEndFadeIn, shouldCheckFadeIn }, setState] = useContext(IntroContext);

  const [resume, setResume] = useState(false);

  return (
    <TweenerDivProvider
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
  const [{ shouldEndFadeIn, step }] = useContext(IntroContext);

  const [looking, setLooking] = useState(false);

  return (
    <TweenerDivProvider
      initialStyle={{ x: 0, y: -20 }}
      tweenTo={{ y: 0 }}
      shouldFadeIn={shouldEndFadeIn}
      options={{ duration: 300, delay: 700, easing: Bezier.outBack, onEnd: () => setLooking(true) }}

      tweenQueue={[
        { x: -5, y: 0 },
        { x: 5, y: 0 },
        { x: -5, y: 0 },
        { x: 5, y: 0 },
        { x: -5, y: 0 },
        { x: 5, y: 0 },
      ]}
      shouldUseTweenQueue={looking}
      tweenQueueOptions={{ duration: 400, delay: 50 }}

      fadeOutStyle={{ x: -10, y: 50 }}
      shouldFadeOut={step === IntroStepType.patternDidFadeIn}
      optionsFadeOut={{
        duration: 300,
        easing: Bezier.inBack,
      }}
    />
  );
});

const Check = memo(() => {
  const [{ shouldCheckFadeIn }] = useContext(IntroContext);
  return (
    <TweenerDivProvider
      initialStyle={{ opacity: 0, scale: 0 }}
      tweenTo={{ opacity: 1, scale: 1 }}
      shouldFadeIn={shouldCheckFadeIn}
      options={{ duration: 150, easing: Bezier.outBack }}
    />
  );
});
const Symbol = memo(() => {
  const [{ shouldCheckFadeIn }] = useContext(IntroContext);
  return (
    <TweenerDivProvider
      initialStyle={{ opacity: 0 }}
      tweenTo={{ opacity: 1 }}
      shouldFadeIn={shouldCheckFadeIn}
      options={{ duration: 150, easing: Bezier.outBack }}
    />
  );
});

const Pattern = memo(() => {
  const [{ shouldEndFadeIn, step }] = useContext(IntroContext);
  const [, setState] = useContext(HomeContext);
  return (
    <TweenerDivProvider
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
          setState((prev) => ({ ...prev, page: HomePageType.calculator }));
        },
      }}
    >
      <div />
      <Glass />
      <CheckBox />
      <Check />
      <Symbol />
    </TweenerDivProvider>
  );
});
export default Pattern;
