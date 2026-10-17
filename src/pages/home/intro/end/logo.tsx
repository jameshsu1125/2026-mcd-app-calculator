import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { IntroContext } from '../config';
import { Bezier } from 'lesca-use-tween';

const Logo = memo(() => {
  const [{ shouldEndFadeIn }] = useContext(IntroContext);

  return (
    <TweenerProvider
      className='logo'
      initialStyle={{ opacity: 0, y: 200 }}
      tweenTo={{ opacity: 1, y: 0 }}
      shouldFadeIn={shouldEndFadeIn}
      options={{ duration: 800, easing: Bezier.inOutQuart }}
    />
  );
});
export default Logo;
