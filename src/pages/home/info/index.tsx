import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import { memo, useContext } from 'react';
import { CalculatorContext, CalculatorStepType } from '../calculator/config';
import { Bezier } from 'lesca-use-tween';

const Info = memo(() => {
  const [{ step }, setState] = useContext(CalculatorContext);
  return (
    <TweenerDivProvider
      initialStyle={{ opacity: 1, y: 0 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{
        duration: 300,
        easing: Bezier.outBack,
        onEnd: () => {
          setState((prev) => ({ ...prev, step: CalculatorStepType.infoDidFadeIn }));
        },
      }}
      shouldFadeIn={step === CalculatorStepType.keyboardDidFadeIn}
    >
      <Button id='info'>
        <Button.Info />
      </Button>
    </TweenerDivProvider>
  );
});
export default Info;
