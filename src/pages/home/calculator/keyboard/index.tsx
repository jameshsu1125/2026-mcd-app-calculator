import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import { MESSAGE_KEYBOARD_INPUT_MAX, MESSAGE_KEYBOARD_INPUT_MIN } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useMemo } from 'react';
import { HomeContext, HomePageType } from '../../config';
import {
  CalculatorContext,
  CalculatorStepType,
  InputOtherActionType,
  Keyboards,
  MAX_INPUT_LENGTH,
  MIN_INPUT_LENGTH,
} from '../config';

type TKeyButtonProps = {
  className: (typeof Keyboards)['breakfast' | 'allDay'][number]['className'];
  dataset: string;
  index: number;
};

const KeyButton = memo(({ className, index, dataset }: TKeyButtonProps) => {
  const [, setContext] = useContext(Context);
  const [{ step, userInput }, setState] = useContext(CalculatorContext);
  const [, setHomeState] = useContext(HomeContext);
  return (
    <TweenerDivProvider
      initialStyle={{
        opacity: step > CalculatorStepType.fadeIn ? 1 : 0,
        y: step > CalculatorStepType.fadeIn ? 0 : 30,
      }}
      tweenTo={{ opacity: 1, y: 0 }}
      shouldFadeIn={step >= CalculatorStepType.fadeIn}
      options={{
        duration: step > CalculatorStepType.fadeIn ? 0 : 100,
        delay: step > CalculatorStepType.fadeIn ? 0 : 300 + index * 20,
        onEnd: () => {
          if (index >= 19) {
            setState((prev) => ({ ...prev, step: CalculatorStepType.keyboardDidFadeIn }));
          }
        },
      }}
    >
      <Button
        disabled={userInput.some((input) => input.className === className)}
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

              case 'switch':
                setState((prev) => ({
                  ...prev,
                  time: prev.time === 'breakfast' ? 'allDay' : 'breakfast',
                  userInput: [],
                }));
                break;

              case 'enter':
                setState((prev) => {
                  if (prev.userInput.length < MIN_INPUT_LENGTH) {
                    setContext({
                      type: ActionType.Modal,
                      state: { enabled: true, body: MESSAGE_KEYBOARD_INPUT_MIN },
                    });
                  } else {
                    setContext({ type: ActionType.UserResult, state: { input: userInput } });
                    setHomeState((prev) => ({ ...prev, page: HomePageType.result }));
                  }
                  return prev;
                });
            }
          } else {
            setState((prev) => {
              if (prev.userInput.length >= MAX_INPUT_LENGTH) {
                setContext({
                  type: ActionType.Modal,
                  state: { enabled: true, body: MESSAGE_KEYBOARD_INPUT_MAX },
                });
                return prev;
              }
              return {
                ...prev,
                userInput: [...prev.userInput, { className, dataset }],
              };
            });
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
            dataset={data.name}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});
export default Keyboard;
