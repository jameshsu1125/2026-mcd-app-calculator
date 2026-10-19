import Toast from '@/components/toast';
import { memo, useContext, useLayoutEffect, useRef, useState } from 'react';
import { CalculatorContext, CalculatorStepType } from '../config';
import './index.less';
import TweenerDivProvider from '@/components/tweenerProvider';

type FocusProps = {
  target: string;
  number: number;
  text: string;
  directionX?: 'LEFT' | 'RIGHT';
  directionY?: 'UP' | 'DOWN';
};

const Focus = memo(({ target, number, text, directionX, directionY }: FocusProps) => {
  const [{ step, instructionState }] = useContext(CalculatorContext);

  const [didFadeIn, setDidFadeIn] = useState(false);

  const [bounds, setBounds] = useState<DOMRect | null>(null);
  const measure = useRef(() => {});

  useLayoutEffect(() => {
    const updateBounds = () => {
      const rect = document.querySelector(target)?.getBoundingClientRect() ?? null;
      setBounds((prev) => {
        if (!rect || !prev) return rect;
        const same =
          prev.left === rect.left &&
          prev.top === rect.top &&
          prev.width === rect.width &&
          prev.height === rect.height;
        return same ? prev : rect;
      });
    };

    measure.current = updateBounds;
    updateBounds();

    // 小螢幕時 .inner 會在掛載後才變成 scrollable（捲軸／版面位移），圖片載入也會改變版面，
    // 所以掛載當下量到的位置可能是舊的；監聽目標與容器尺寸變化並在下一個 frame 重新量測。
    const observer = new ResizeObserver(updateBounds);
    const currentTarget = document.querySelector(target);
    if (currentTarget) observer.observe(currentTarget);
    const root = document.querySelector('.Calculator');
    if (root) observer.observe(root);
    const contain = document.querySelector('.Calculator .contain');
    if (contain) observer.observe(contain);

    window.addEventListener('resize', updateBounds);
    window.addEventListener('load', updateBounds);
    window.addEventListener('scroll', updateBounds, true);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('load', updateBounds);
      window.removeEventListener('scroll', updateBounds, true);
    };
  }, []);

  // 按鍵與 #info 是用 transform 動畫進場（ResizeObserver 偵測不到），
  // 進場完成前量到的位置會偏移；到 keyboardDidFadeIn 後逐 frame 追蹤到動畫結束。
  useLayoutEffect(() => {
    if (step !== CalculatorStepType.keyboardDidFadeIn) return undefined;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      measure.current();
      if (performance.now() - start < 800) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [step]);

  if (!bounds) return null;

  return (
    <TweenerDivProvider
      style={{
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
      }}
      initialStyle={{ opacity: 0, scale: 2 }}
      tweenTo={{ opacity: 1, scale: 1 }}
      options={{ duration: 300, onEnd: () => setDidFadeIn(true) }}
      shouldFadeIn={instructionState.step === number}
      className='switch'

      fadeOutStyle={{ opacity: 0 }}
      optionsFadeOut={{ duration: 300 }}
      shouldFadeOut={instructionState.step !== number}
    >
      <Toast
        number={number}
        directionX={directionX}
        directionY={directionY}
        shouldFadeIn={didFadeIn}
      >
        {text}
      </Toast>
    </TweenerDivProvider>
  );
});

export default Focus;
