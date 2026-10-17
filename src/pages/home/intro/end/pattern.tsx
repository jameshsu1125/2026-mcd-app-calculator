import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext, useEffect } from 'react';
import { IntroContext } from '../config';
import { Bezier } from 'lesca-use-tween';

const CheckBox = memo(() => {
  const [{ shouldEndFadeIn }] = useContext(IntroContext);
  return (
    <TweenerProvider
      initialStyle={{ scaleX: 0 }}
      tweenTo={{ scaleX: 1 }}
      shouldFadeIn={shouldEndFadeIn}
      options={{ duration: 300, delay: 950, easing: Bezier.outBack }}
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

const Pattern = memo(() => {
  const [{ shouldEndFadeIn }] = useContext(IntroContext);
  return (
    <TweenerProvider
      className='pattern'
      initialStyle={{ opacity: 1, y: 200 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{ duration: 800, delay: 100, easing: Bezier.inOutQuart }}
      shouldFadeIn={shouldEndFadeIn}
    >
      <div />
      <Glass />
      <CheckBox />
      <div />
    </TweenerProvider>
  );
});
export default Pattern;
