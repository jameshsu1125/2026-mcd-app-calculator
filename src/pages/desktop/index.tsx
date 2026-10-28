import TweenerDivProvider from '@/components/tweenerProvider';
import OnloadProvider from 'lesca-react-onload';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useState } from 'react';
import { DesktopContext, DesktopState, IDesktopStepType } from './config';
import './index.less';
import Qrcode from '@/components/qrcode';

const CheckBox = memo(() => {
  const [{ step, shouldCheckFadeIn }, setState] = useContext(DesktopContext);
  const [resume, setResume] = useState(false);

  return (
    <TweenerDivProvider
      initialStyle={{ scaleX: 1, scaleY: 1 }}
      tweenTo={{ scaleX: 1.5, scaleY: 0.5 }}
      shouldFadeIn={step === IDesktopStepType.fadeIn}
      options={{
        duration: 150,
        easing: Bezier.outQuart,
        delay: 1300,
        onEnd: () => {
          setState((prev) => ({ ...prev, shouldCheckFadeIn: true }));
        },
      }}
      fadeOutStyle={{ scaleX: 0.5, scaleY: 1.5 }}
      shouldFadeOut={shouldCheckFadeIn}
      optionsFadeOut={{
        duration: 150,
        easing: Bezier.outQuart,
        onEnd: () => {
          setResume(true);
        },
      }}
      tweenQueue={[{ scaleX: 1, scaleY: 1 }]}
      shouldUseTweenQueue={resume}
      tweenQueueOptions={{
        duration: 150,
      }}
    />
  );
});

const Glass = memo(() => {
  const [{ step }, setState] = useContext(DesktopContext);
  const [looking, setLooking] = useState(false);

  return (
    <TweenerDivProvider
      initialStyle={{ x: 0, y: -20 }}
      tweenTo={{ y: 0 }}
      shouldFadeIn={step == IDesktopStepType.fadeIn}
      options={{ duration: 700, delay: 100, easing: Bezier.inQuart, onEnd: () => setLooking(true) }}
      tweenQueue={[
        { x: -5, y: 0 },
        { x: 5, y: 0 },
        { x: -5, y: 0 },
        { x: 5, y: 0 },
        { x: -5, y: 0 },
        { x: 5, y: 0 },
        { x: 0, y: 0 },
      ]}
      shouldUseTweenQueue={looking}
      tweenQueueOptions={{
        duration: 400,
        onEnd: () => {
          setState((prev) => ({ ...prev, shouldCheckFadeIn: true }));
        },
      }}
    />
  );
});

const Check = memo(() => {
  const [{ shouldCheckFadeIn }, setState] = useContext(DesktopContext);
  return (
    <TweenerDivProvider
      initialStyle={{ opacity: 0, scale: 0 }}
      tweenTo={{ opacity: 1, scale: 1 }}
      shouldFadeIn={shouldCheckFadeIn}
      options={{
        duration: 150,
        easing: Bezier.outBack,
        onEnd: () => {
          setTimeout(() => {
            setState((prev) => ({ ...prev, step: IDesktopStepType.fadeOut }));
          }, 1000);
        },
      }}
    />
  );
});

const Symbol = memo(() => {
  const [{ shouldCheckFadeIn }] = useContext(DesktopContext);
  return (
    <TweenerDivProvider
      initialStyle={{ opacity: 0 }}
      tweenTo={{ opacity: 1 }}
      shouldFadeIn={shouldCheckFadeIn}
      options={{ duration: 150, easing: Bezier.outBack }}
    />
  );
});

const Desktop = memo(() => {
  const [state, setState] = useState(DesktopState);

  return (
    <DesktopContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((prev) => ({ ...prev, step: IDesktopStepType.fadeIn }));
        }}
      >
        <div className='Desktop'>
          <div className='glow' />
          <div className='bg' />
          <div className='ctx'>
            <div className='flex w-full flex-col items-center justify-center gap-10'>
              <TweenerDivProvider
                className='welcome'
                initialStyle={{ opacity: 0, y: 420 }}
                tweenTo={{ opacity: 1, y: 220 }}
                options={{ duration: 800, easing: Bezier.inOutQuart }}
                shouldFadeIn={state.step === IDesktopStepType.fadeIn}

                fadeOutStyle={{ opacity: 1, y: 0 }}
                shouldFadeOut={state.step === IDesktopStepType.fadeOut}
                optionsFadeOut={{ duration: 800, easing: Bezier.inOutQuart }}
              />
              <div className='flex w-4xl justify-center'>
                <TweenerDivProvider
                  className='pattern'
                  initialStyle={{ opacity: 0, y: 420, scaleX: 1, scaleY: 1 }}
                  tweenTo={{ opacity: 1, y: 220 }}
                  options={{ duration: 800, delay: 100, easing: Bezier.inOutQuart }}
                  shouldFadeIn={state.step === IDesktopStepType.fadeIn}

                  fadeOutStyle={{ opacity: 1, y: 0 }}
                  shouldFadeOut={state.step === IDesktopStepType.fadeOut}
                  optionsFadeOut={{ duration: 800, easing: Bezier.inOutQuart, delay: 50 }}
                >
                  <div />
                  <Glass />
                  <CheckBox />
                  <Check />
                  <Symbol />
                </TweenerDivProvider>
              </div>
              <TweenerDivProvider
                className='text-0'
                initialStyle={{ opacity: 0, y: 200 }}
                tweenTo={{ opacity: 1, y: 0 }}
                options={{ duration: 800, easing: Bezier.inOutQuart, delay: 100 }}
                shouldFadeIn={state.step === IDesktopStepType.fadeOut}
              />
              <TweenerDivProvider
                className='text-1'
                initialStyle={{ opacity: 0, y: 200 }}
                tweenTo={{ opacity: 1, y: 0 }}
                options={{
                  duration: 800,
                  easing: Bezier.inOutQuart,
                  delay: 150,
                  onEnd: () => {
                    setState((prev) => ({ ...prev, step: IDesktopStepType.qrcode }));
                  },
                }}
                shouldFadeIn={state.step === IDesktopStepType.fadeOut}
              />
              {state.step >= IDesktopStepType.fadeIn ? (
                <TweenerDivProvider
                  className='flex w-full justify-center'
                  initialStyle={{ opacity: 0 }}
                  tweenTo={{ opacity: 1 }}
                  options={{ duration: 500 }}
                  shouldFadeIn={state.step === IDesktopStepType.qrcode}
                >
                  <Qrcode content={window.location.href} size={300} />
                </TweenerDivProvider>
              ) : (
                <div className='h-75 w-75' />
              )}
            </div>
          </div>
        </div>
      </OnloadProvider>
    </DesktopContext.Provider>
  );
});
export default Desktop;
