import { memo, useContext } from 'react';
import Frame from './frame';
import './index.less';
import UpperText from './upperText';
import TweenerDivProvider from '@/components/tweenerProvider';
import { INTRO_SPEED, IntroContext, IntroStepType } from '../config';
import { Bezier } from 'lesca-use-tween';

const FastPass = memo(() => {
  const [{ step }, setState] = useContext(IntroContext);

  return (
    <div className='FastPass'>
      <TweenerDivProvider
        className='inner'
        initialStyle={{ scale: 0.72 }}
        tweenTo={{ scale: 30 }}
        shouldFadeIn={step === IntroStepType.fadeIn}
        options={{
          duration: 18000 * INTRO_SPEED,
          easing: Bezier.inQuart,
          onEnd: () => {
            setState((prev) => ({
              ...prev,
              step: IntroStepType.frameDidZoomed,
              appendFastPass: false,
            }));
          },
        }}
      >
        <Frame />
        <UpperText />
      </TweenerDivProvider>
    </div>
  );
});
export default FastPass;
