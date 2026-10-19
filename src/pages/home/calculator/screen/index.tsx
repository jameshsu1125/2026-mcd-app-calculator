import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useMemo } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';
import './index.less';
import { twMerge } from 'tailwind-merge';

const Screen = memo(() => {
  const [{ step, userInput }] = useContext(CalculatorContext);

  const input = useMemo(() => {
    const element = userInput.map((item, index) => (
      <div key={`input-${item}-${index}`} className={twMerge('item', item.className)}>
        <span>{item.dataset}</span>
      </div>
    ));

    const elementAddPlus = element.flatMap((item, index) =>
      index < element.length - 1 ? [item, <div key={`plus-${index}`} className='plus' />] : [item],
    );

    return elementAddPlus;
  }, [userInput]);

  return (
    <div className='blockquote min-h-24 flex-1 items-stretch justify-between'>
      <TweenerDivProvider
        className='input text-black'
        initialStyle={{ opacity: 0, y: 100 }}
        tweenTo={{ opacity: 1, y: 0 }}
        shouldFadeIn={step === CalculatorStepType.fadeIn}
        options={{ duration: 200, easing: Bezier.outBack, delay: 100 }}
      >
        {input}
      </TweenerDivProvider>
    </div>
  );
});
export default Screen;
