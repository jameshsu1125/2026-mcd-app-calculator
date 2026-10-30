import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import { MESSAGE_KEYBOARD_INPUT_MAX, MESSAGE_KEYBOARD_INPUT_MIN } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, LoadingProcessVersion } from '@/settings/type';
import { memo, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType } from '../../config';
import {
  CalculatorContext,
  CalculatorStepType,
  InputOtherActionType,
  Keyboards,
  MAX_INPUT_LENGTH,
  MIN_INPUT_LENGTH,
} from '../config';
import { trackCustomEvent } from '@/utils';

type TKeyButtonProps = {
  className: (typeof Keyboards)['breakfast' | 'allDay'][number]['className'];
  dataset: { id: string; name: string };
  index: number;
};

const KeyButton = memo(({ className, index, dataset }: TKeyButtonProps) => {
  const [{ sounds }, setContext] = useContext(Context);
  const [{ step, userInput, time }, setState] = useContext(CalculatorContext);
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
          trackCustomEvent(`計算機按鍵-${dataset.name}`, dataset);
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
                sounds?.instance?.stopAll();
                sounds?.instance?.play('correct');
                break;

              case 'enter':
                if (userInput.length < MIN_INPUT_LENGTH) {
                  setContext({
                    type: ActionType.Modal,
                    state: {
                      enabled: true,
                      body: MESSAGE_KEYBOARD_INPUT_MIN,
                      className: '',
                    },
                  });
                  sounds?.instance?.stopAll();
                  sounds?.instance?.play('wrong');
                } else {
                  setContext({
                    type: ActionType.UserResult,
                    state: { time, input: userInput },
                  });
                  setContext({
                    type: ActionType.LoadingProcess,
                    state: { enabled: true, body: '計算中', version: LoadingProcessVersion.Mcd },
                  });
                  sounds?.instance?.stopAll();
                  sounds?.instance?.play('levelUp');

                  setTimeout(() => {
                    setHomeState((prev) => ({ ...prev, page: HomePageType.result }));
                  }, 1500);
                }
                break;

              case 'script':
                sounds?.instance?.stopAll();
                sounds?.instance?.play('script');
                break;

              case 'hungry':
                sounds?.instance?.stopAll();
                sounds?.instance?.play('hungry');
                break;

              case 'bird':
                sounds?.instance?.stopAll();
                sounds?.instance?.play('bird');
                break;

              case 'mcd':
                setState((prev) => ({
                  ...prev,
                  hiddenDiscounts: [...prev.hiddenDiscounts, 'mcd'],
                }));
                sounds?.instance?.stopAll();
                sounds?.instance?.play('mcd');
                break;
            }
          } else {
            if (userInput.length >= MAX_INPUT_LENGTH) {
              setContext({
                type: ActionType.Modal,
                state: { enabled: true, body: MESSAGE_KEYBOARD_INPUT_MAX, className: '' },
              });
              sounds?.instance?.stopAll();
              sounds?.instance?.play('wrong');
              return;
            }
            setState((prev) => ({
              ...prev,
              userInput: [...prev.userInput, { className, dataset }],
            }));

            setState((prev) => ({
              ...prev,
              hiddenDiscounts: [...prev.hiddenDiscounts, className],
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
  const [{ sounds }] = useContext(Context);
  const [{ time }] = useContext(CalculatorContext);

  const keyboard = useMemo(
    () => (time === 'breakfast' ? Keyboards.breakfast : Keyboards.allDay),
    [time],
  );

  useEffect(() => {
    const handleUserInteraction = () => {
      // TODO: 在這裡加入使用者點擊畫面時要執行的程式。
      requestAnimationFrame(() => {
        sounds?.instance?.stop('script');
        sounds?.instance?.stop('bird');
        sounds?.instance?.stop('hungry');
        sounds?.instance?.stop('mcd');
      });
    };

    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [sounds]);

  return (
    <div className='w-full shrink-0 px-5'>
      <div className='grid w-full grid-cols-4 gap-3'>
        {keyboard.map((data, index) => (
          <KeyButton
            key={`keyboard-${data.className}-${index}`}
            className={data.className}
            dataset={{ id: data.id ?? '', name: data.name ?? '' }}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});
export default Keyboard;
