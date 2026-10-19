import TweenerDivProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { IntroContext, IntroStepType } from '../config';
import { Bezier } from 'lesca-use-tween';

const Logo = memo(() => {
  const [{ shouldEndFadeIn, step }] = useContext(IntroContext);

  return (
    <TweenerDivProvider
      className='logo'
      initialStyle={{ opacity: 0, y: 200, scaleX: 1, scaleY: 1 }}
      tweenTo={{ opacity: 1, y: 0 }}
      shouldFadeIn={shouldEndFadeIn}
      options={{ duration: 800, easing: Bezier.inOutQuart }}

      fadeOutStyle={{ opacity: 0, y: -200, scaleX: 0.5, scaleY: 1.5 }}
      shouldFadeOut={step === IntroStepType.patternDidFadeIn}
      optionsFadeOut={{ duration: 300, easing: Bezier.inBack }}
    />
  );
});
export default Logo;
