import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';
import { Bezier } from 'lesca-use-tween';

const Logo = memo(() => {
  const [{ step }] = useContext(CalculatorContext);
  return (
    <TweenerProvider
      className='logo'
      initialStyle={{ opacity: 0, scaleX: 0.5, scaleY: 2, y: 100 }}
      tweenTo={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0 }}
      shouldFadeIn={step === CalculatorStepType.fadeIn}
      options={{ duration: 300, easing: Bezier.outBack }}
    />
  );
});
export default Logo;
