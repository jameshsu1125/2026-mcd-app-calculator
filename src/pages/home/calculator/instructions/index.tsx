import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import Click from 'lesca-click';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { CalculatorContext, CalculatorStepType } from '../config';
import Focus from './focus';
import './index.less';

const Instructions = memo(() => {
  const id = useId();
  const [{ step, instructionState }, setState] = useContext(CalculatorContext);

  useEffect(() => {
    if (instructionState.step > 5) {
      setState((prev) => ({ ...prev, step: CalculatorStepType.instructionDidFadeIn }));
    }
  }, [instructionState]);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setState((prev) => ({
        ...prev,
        instructionState: { ...prev.instructionState, step: prev.instructionState.step + 1 },
      }));
    });
  }, [id]);

  return (
    <div
      className={twMerge(
        'Instructions hidden',
        step >= CalculatorStepType.infoDidFadeIn && 'block',
      )}
    >
      <TweenerDivProvider
        id={id}
        className='bg'
        initialStyle={{ opacity: 0 }}
        tweenTo={{ opacity: 1 }}
        shouldFadeIn={step === CalculatorStepType.infoDidFadeIn}
        options={{
          duration: 50,
          onEnd: () => {
            setState((prev) => ({
              ...prev,
              instructionState: { ...prev.instructionState, step: prev.instructionState.step + 1 },
            }));
          },
        }}
        fadeOutStyle={{ opacity: 0 }}
        shouldFadeOut={step === CalculatorStepType.instructionDidFadeIn}
        optionsFadeOut={{
          duration: 50,
          onEnd: () => {
            setState((prev) => ({
              ...prev,
              step: CalculatorStepType.startCalculator,
              instructionState: { ...prev.instructionState, enabled: false },
            }));
          },
        }}
      />
      <div className='pointer-events-none absolute h-full w-full'>
        <Focus target='.Calculator .contain .switch' number={1} text='切換早餐時段／午晚餐時段' />
        <Focus target='.Calculator .contain .msoda' number={2} text='選擇2-6個想要的美味' />
        <Focus target='.Calculator .contain .del' number={3} text='改變心意，可刪除' />
        <Focus
          target='.Calculator .contain .enter'
          number={4}
          text='點此計算適用優惠'
          directionX='RIGHT'
        />

        <Focus
          target='.Calculator .contain #info'
          number={5}
          text='點此查看優惠計算範圍與說明'
          directionY='DOWN'
        />
        <TweenerDivProvider
          className='relative flex h-full w-full justify-center'
          initialStyle={{ opacity: 0, y: -50 }}
          tweenTo={{ opacity: 1, y: 0 }}
          shouldFadeIn={step === CalculatorStepType.infoDidFadeIn}
          options={{ duration: 300, delay: 500, easing: Bezier.outBack }}

          fadeOutStyle={{ opacity: 0 }}
          shouldFadeOut={step === CalculatorStepType.instructionDidFadeIn}
          optionsFadeOut={{ duration: 50 }}
        >
          <div className='relative w-full max-w-md'>
            <Button
              className='pointer-events-auto absolute top-[5%] right-[5%] w-14'
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  instructionState: { ...prev.instructionState, step: 6 },
                }));
              }}
            >
              <Button.Skip />
            </Button>
          </div>
        </TweenerDivProvider>
      </div>
    </div>
  );
});
export default Instructions;
