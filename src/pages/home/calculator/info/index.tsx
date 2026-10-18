import Button from '@/components/button';
import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';
import { Bezier } from 'lesca-use-tween';

const Info = memo(() => {
  const [{ step }] = useContext(CalculatorContext);
  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, scale: 0 }}
      tweenTo={{ opacity: 1, scale: 1 }}
      options={{ duration: 500, easing: Bezier.outBack }}
      // shouldFadeIn={step === CalculatorStepType.unset}
    >
      <Button id='info'>
        <Button.Info />
      </Button>
    </TweenerProvider>
  );
});
export default Info;
