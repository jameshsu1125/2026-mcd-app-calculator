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
        initialStyle={{ scale: 1 }}
        tweenTo={{ scale: 100 }}
        shouldFadeIn={step === IntroStepType.fadeIn}
        options={{
          duration: 10000,
          easing: Bezier.inOutQuart,
          onEnd: () => {},
        }}
      >
        <Frame />
        <UpperText />
        {/* <div className='lower-text' /> */}
      </TweenerProvider>
    </div>
  );
});
export default FastPass;
