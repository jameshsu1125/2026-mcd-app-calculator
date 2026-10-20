import TweenerDivProvider from '@/components/tweenerProvider';
import { memo, useContext, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IntroContext, IntroStepType } from '../config';
import './index.less';
import { Bezier } from 'lesca-use-tween';

const UpperText = memo(() => {
  const [{ step, shouldEndFadeIn }] = useContext(IntroContext);
  const parentRef = useRef<HTMLDivElement>(null);

  // 讓每個子元素以 UpperText 的正中心作為縮放中心點
  useEffect(() => {
    const update = () => {
      const parent = parentRef.current;
      if (!parent) return;
      const pRect = parent.getBoundingClientRect();
      const cx = pRect.left + pRect.width / 2;
      const cy = pRect.top + pRect.height / 2;
      Array.from(parent.children).forEach((el) => {
        if (el.tagName !== 'DIV') return;
        const node = el as HTMLElement;
        const style = node.style;
        style.transformOrigin = '0 0';
        const transform = style.transform;
        style.transform = 'none';
        const r = node.getBoundingClientRect();
        style.transform = transform;

        style.transformOrigin = `${(cx - r.left) * 1.7}px ${(cy - r.top) * 1.3}px`;
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  console.log(shouldEndFadeIn);

  return (
    <TweenerDivProvider
      innerRef={parentRef}
      className='UpperText'
      initialStyle={{ opacity: 0 }}
      tweenTo={{ opacity: 1 }}
      shouldFadeIn={step === IntroStepType.frameDidBlanking}
      options={{ duration: 5000, easing: Bezier.outQuart, delay: 500 }}

      fadeOutStyle={{ opacity: 0 }}
      optionsFadeOut={{ duration: 10 }}
      shouldFadeOut={shouldEndFadeIn}
    >
      {[...new Array(8).keys()].map((i) => (
        <TweenerDivProvider
          key={i}
          className={twMerge('animate-blank')}
          style={{ animationDelay: `-${Math.random() * 2}s` }}
          initialStyle={{ scale: 1 }}
          tweenTo={{ scale: 2 + Math.random() * 1.5 }}
          shouldFadeIn={step === IntroStepType.frameDidBlanking}
          options={{ duration: 7000 + Math.random() * 1500, easing: Bezier.inQuart, delay: 2500 }}
        >
          <div />
        </TweenerDivProvider>
      ))}
    </TweenerDivProvider>
  );
});
export default UpperText;
