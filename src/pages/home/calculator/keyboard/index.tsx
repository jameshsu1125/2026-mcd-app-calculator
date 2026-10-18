import Button from '@/components/button';
import TweenerProvider from '@/components/tweenerProvider';
import { memo, useContext, useMemo } from 'react';
import { CalculatorContext, CalculatorStepType, Keyboards } from '../config';

const KeyButton = memo(({ className, index }: { className: string; index: number }) => {
  const [{ step }, setState] = useContext(CalculatorContext);
  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, y: 30 }}
      tweenTo={{ opacity: 1, y: 0 }}
      shouldFadeIn={step === CalculatorStepType.fadeIn}
      options={{
        duration: 100,
        delay: 300 + index * 20,
        onEnd: () => {
          if (index >= 19) {
            setState((prev) => ({ ...prev, step: CalculatorStepType.keyboardDidFadeIn }));
          }
        },
      }}
    >
      <Button className='relative w-full pb-[100%]'>
        <Button.Keyboard className={className} />
      </Button>
    </TweenerProvider>
  );
});

const Keyboard = memo(() => {
  const [{ time }] = useContext(CalculatorContext);

  const keyboard = useMemo(
    () => (time === 'breakfast' ? Keyboards.breakfast : Keyboards.allDay),
    [time],
  );

  return (
    <div className='w-full shrink-0 px-5'>
      <div className='grid w-full grid-cols-4 gap-5'>
        {keyboard.map((data, index) => (
          <KeyButton
            key={`keyboard-${data.className}-${index}`}
            className={data.className}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});
export default Keyboard;
