import Button from '@/components/button';
import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';
import { Bezier } from 'lesca-use-tween';

const Info = memo(() => {
  const [{ step }] = useContext(CalculatorContext);
  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, y: -50 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{ duration: 300, easing: Bezier.outBack }}
      shouldFadeIn={step === CalculatorStepType.keyboardDidFadeIn}
    >
      <Button id='info'>
        <Button.Info />
      </Button>
    </TweenerProvider>
  );
});
export default Info;
