import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ResultContext, ResultStepType } from '../config';
import { Char } from './config';
import './idles.less';

const Idle0 = memo(() => {
  const [{ step }] = useContext(ResultContext);
  return (
    <>
      <div className='body' />
      <div className='left-hand' />
      <div className='right-hand' />
      <div className='left-eye' />
      <div className='right-eye' />
      <TweenerDivProvider
        className='item'
        initialStyle={{ opacity: 0, scale: 0, y: 200 }}
        tweenTo={{ opacity: 1, y: 0, scale: 1 }}
        shouldFadeIn={step === ResultStepType.fadeIn}
        options={{ duration: 250, delay: 700, easing: Bezier.outBack }}
      />
    </>
  );
});

const Idle1 = memo(() => {
  const [{ step }] = useContext(ResultContext);
  return (
    <>
      <div className='body' />
      <div className='left-hand' />
      <div className='right-hand' />
      <div className='left-eye' />
      <div className='right-eye' />
      <div className='mouse' />
      <TweenerDivProvider
        className='item'
        initialStyle={{ opacity: 0, scale: 0, y: -300 }}
        tweenTo={{ opacity: 1, y: 0, scale: 1 }}
        shouldFadeIn={step === ResultStepType.fadeIn}
        options={{ duration: 250, delay: 700, easing: Bezier.outBack }}
      />
    </>
  );
});

const Effect1 = memo(() => {
  const [{ step }] = useContext(ResultContext);
  return (
    <>
      <TweenerDivProvider
        className='effect-0'
        initialStyle={{ opacity: 0, scale: 0 }}
        tweenTo={{ opacity: 1, scale: 1 }}
        shouldFadeIn={step === ResultStepType.fadeIn}
        options={{ duration: 250, delay: 750, easing: Bezier.outBack }}
      />
      <TweenerDivProvider
        className='effect-1'
        initialStyle={{ opacity: 0, scale: 0 }}
        tweenTo={{ opacity: 1, scale: 1 }}
        shouldFadeIn={step === ResultStepType.fadeIn}
        options={{ duration: 250, delay: 950, easing: Bezier.outBack }}
      />
    </>
  );
});

const Idles = memo(({ idleType }: { idleType: 0 | 1 | 2 | -1 | 4 | 3 | 5 }) => {
  const [{ step }] = useContext(ResultContext);

  const idleComponent = useMemo(() => {
    switch (idleType) {
      case 0:
        return <Idle0 />;
      case 1:
        return <Idle1 />;
      default:
        return null;
    }
  }, [idleType]);

  const Effect = useMemo(() => {
    switch (idleType) {
      case 1:
        return <Effect1 />;
      default:
        return null;
    }
  }, [idleType]);

  return (
    <div className={twMerge('idle', `idle-${idleType}`)}>
      {idleType >= 0 ? (
        <TweenerDivProvider
          className='animate-hop-sway'
          initialStyle={Char[idleType].initialStyle}
          tweenTo={Char[idleType].tweenTo}
          shouldFadeIn={step === ResultStepType.fadeIn}
          options={Char[idleType].options}
        >
          {idleComponent}
        </TweenerDivProvider>
      ) : (
        <div />
      )}
      {Effect}
      {/*<Item index={IdleType} />
      <Effect index={IdleType} /> */}
    </div>
  );
});
export default Idles;
