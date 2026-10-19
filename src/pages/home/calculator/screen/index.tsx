import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useMemo } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';

const Screen = memo(() => {
  const [{ step, userInput }] = useContext(CalculatorContext);

  const input = useMemo(() => {
    console.log(userInput);
    return userInput;
  }, [userInput]);

  return (
    <div className='blockquote min-h-24 flex-1 items-stretch justify-between'>
      <TweenerDivProvider
        className='input'
        initialStyle={{ opacity: 0, y: 100 }}
        tweenTo={{ opacity: 1, y: 0 }}
        shouldFadeIn={step === CalculatorStepType.fadeIn}
        options={{ duration: 200, easing: Bezier.outBack, delay: 100 }}
      >
        {/**
         *
         */}
      </TweenerDivProvider>
    </div>
  );
});
export default Screen;
