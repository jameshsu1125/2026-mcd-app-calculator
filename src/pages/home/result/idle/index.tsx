import Blockquote from '@/components/blockquote';
import TweenerDivProvider from '@/components/tweenerProvider';
import useResult from '@/hooks/useResult';
import { MAXIMAL_SAVING_AMOUNT, MINIMAL_SAVING_AMOUNT } from '@/settings/config';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Info from '../../info';
import Logo from '../../logo';
import { Char, Effects, Items } from './config';
import './index.less';
import { ResultContext, ResultStepType } from '../config';
import Idles from './idles';
import { TIdleType } from '@/settings/type';

const CATEGORY_TYPE_TO_CLASS = {
  肉類: 'meat',
  炸物: 'fried',
  '湯／甜點／飲料': 'soup-dessert-drink',
  '咖啡／茶': 'coffee-tea',
  none: 'none',
} as const;

const Item = memo(({ index }: { index: number }) => {
  const [{ step }] = useContext(ResultContext);
  const [isSwing, setIsSwing] = useState(false);
  const currentItem = useMemo(() => {
    return Items[index] ?? [];
  }, [index]);
  return (
    <>
      {currentItem.map((item, i) => {
        return (
          <TweenerDivProvider
            key={i}
            className={twMerge(isSwing ? item.loopClass : '')}
            initialStyle={item.initialStyle}
            tweenTo={item.tweenTo}
            shouldFadeIn={step === ResultStepType.fadeIn}
            options={{
              ...item.options,
              onEnd: () => setIsSwing(true),
            }}
          />
        );
      })}
    </>
  );
});

const Effect = memo(({ index }: { index: number }) => {
  const [{ step }] = useContext(ResultContext);
  const [isSwing, setIsSwing] = useState(false);
  const currentEffect = useMemo(() => {
    return Effects[index] ?? [];
  }, [index]);
  return (
    <>
      {currentEffect.map((effect, i) => (
        <TweenerDivProvider
          key={i}
          className={twMerge(isSwing ? effect.loopClass : '')}
          initialStyle={effect.initialStyle}
          tweenTo={effect.tweenTo}
          shouldFadeIn={step === ResultStepType.fadeIn}
          options={{
            ...effect.options,
            onEnd: () => setIsSwing(true),
          }}
        />
      ))}
    </>
  );
});

const Idle = memo(() => {
  const [{ step }] = useContext(ResultContext);
  const view = useResult();

  const idleType = useMemo(() => {
    if (!view) return -1;

    return 1;

    if (view.summary.savings <= MINIMAL_SAVING_AMOUNT) return 4;
    if (view.summary.savings >= MAXIMAL_SAVING_AMOUNT) return 3;

    // 平手規則在 useResult 的 CATEGORY_TIE_PRIORITY（平手時咖啡／茶優先）
    const topCategoryType = view.summary.topCategory as keyof typeof CATEGORY_TYPE_TO_CLASS;

    switch (topCategoryType) {
      case '肉類':
        return 0;
      case '炸物':
        return 1;
      case '湯／甜點／飲料':
        return 2;
      case '咖啡／茶':
        return 5;
    }
    return -1;
  }, [view]);

  return (
    <div className='Idle'>
      <div className='w-full pt-[5%]'>
        <div className='relative flex w-full items-start justify-center'>
          <div className='relative flex w-full flex-col items-center justify-center'>
            <Blockquote className='max-w-md items-start justify-between'>
              <Info shouldFadeIn={step === ResultStepType.fadeIn} isReverse />
              <Logo shouldFadeIn={step === ResultStepType.fadeIn} className='mt-6' />
              <div className='opacity-0' />
            </Blockquote>
            <div className='relative flex w-full flex-col items-center justify-center gap-2 px-5'>
              <Blockquote className='justify-center'>
                <TweenerDivProvider
                  className={twMerge('headline', `headline-${idleType}`)}
                  initialStyle={{ opacity: 0, y: 50, scaleX: 0.5, scaleY: 1.5 }}
                  tweenTo={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
                  shouldFadeIn={step === ResultStepType.fadeIn}
                  options={{ duration: 250, delay: 200, easing: Bezier.outBack }}
                />
              </Blockquote>
              <Blockquote className='justify-center'>
                <TweenerDivProvider
                  className={twMerge('subline', `subline-${idleType}`)}
                  initialStyle={{ opacity: 0, y: 50, scaleX: 0.5, scaleY: 1.5 }}
                  tweenTo={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
                  shouldFadeIn={step === ResultStepType.fadeIn}
                  options={{ duration: 250, delay: 300, easing: Bezier.outBack }}
                />
              </Blockquote>
              <Blockquote className='justify-center pt-0'>
                <Idles idleType={idleType} />
              </Blockquote>
              <TweenerDivProvider
                className='fast-pass'
                initialStyle={{ opacity: 0, scale: 5 }}
                tweenTo={{ opacity: 1, scale: 1 }}
                shouldFadeIn={step === ResultStepType.fadeIn}
                options={{ duration: 250, delay: 1000 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Idle;
