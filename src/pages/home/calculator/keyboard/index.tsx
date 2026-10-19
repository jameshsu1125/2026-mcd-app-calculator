import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import { memo, useContext, useMemo } from 'react';
import { CalculatorContext, CalculatorStepType, InputOtherActionType, Keyboards } from '../config';

type TKeyButtonProps = {
  className: (typeof Keyboards)['breakfast' | 'allDay'][number]['className'];
  index: number;
};

const KeyButton = memo(({ className, index }: TKeyButtonProps) => {
  const [{ step }, setState] = useContext(CalculatorContext);
  return (
    <TweenerDivProvider
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
      <Button
        className='relative block w-full pb-[100%]'
        onClick={() => {
          if (Object.keys(InputOtherActionType).includes(className)) {
            switch (className) {
              case 'del':
                setState((prev) => ({
                  ...prev,
                  userInput: prev.userInput.slice(0, -1),
                }));
                break;
            }
          } else {
            setState((prev) => ({
              ...prev,
              userInput: [...prev.userInput, className],
            }));
          }
        }}
      >
        <Button.Keyboard className={className} />
      </Button>
    </TweenerDivProvider>
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
      <div className='grid w-full grid-cols-4 gap-3'>
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
