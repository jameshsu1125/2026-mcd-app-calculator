import { memo, useContext } from 'react';
import Frame from './frame';
import './index.less';
import UpperText from './upperText';
import TweenerProvider from '@/components/tweenerProvider';
import { IntroContext, IntroStepType } from '../config';
import { Bezier } from 'lesca-use-tween';

const FastPass = memo(() => {
  const [{ step }, setState] = useContext(IntroContext);

  return (
    <div className='FastPass'>
      <TweenerProvider
        className='inner'
        initialStyle={{ scale: 0.72 }}
        tweenTo={{ scale: 30 }}
        shouldFadeIn={step === IntroStepType.fadeIn}
        options={{
          duration: 18000,
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
      </TweenerProvider>
    </div>
  );
});
export default FastPass;
