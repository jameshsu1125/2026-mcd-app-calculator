import TweenerProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';

const Screen = memo(() => {
  const [{ step }] = useContext(CalculatorContext);
  return (
    <div className='blockquote min-h-36 flex-1 items-stretch justify-between'>
      <TweenerProvider
        className='input'
        initialStyle={{ opacity: 0, y: 100 }}
        tweenTo={{ opacity: 1, y: 0 }}
        shouldFadeIn={step === CalculatorStepType.fadeIn}
        options={{ duration: 200, easing: Bezier.outBack, delay: 100 }}
      >
        {/**
         *
         */}
      </TweenerProvider>
    </div>
  );
});
export default Screen;
