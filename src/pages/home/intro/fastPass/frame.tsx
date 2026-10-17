import { memo, useContext, useEffect } from 'react';
import { IntroContext, IntroStepType } from '../config';
import './index.less';
import useTween, { Bezier } from 'lesca-use-tween';

const Frame = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });

  const [{ step }, setState] = useContext(IntroContext);

  useEffect(() => {
    if (step === IntroStepType.fadeIn) {
      setStyle(
        { opacity: 1 },
        {
          duration: 3000,
          easing: Bezier.inQuart,
          onEnd: () => setState((prev) => ({ ...prev, step: IntroStepType.frameDidFadeIn })),
        },
      );
    }
  }, [step]);

  return <div className='frame' style={style} />;
});
export default Frame;
