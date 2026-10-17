import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { IntroContext, IntroStepType } from '../config';
import './index.less';

const UpperText = memo(() => {
  const [{ step }] = useContext(IntroContext);
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    if (step === IntroStepType.fadeIn) {
      setStyle({ opacity: 1 }, { duration: 3000, easing: Bezier.inQuart });
    }
  }, [step]);
  return (
    <div className='UpperText' style={style}>
      {[...new Array(8).keys()].map((i) => (
        <div
          key={i}
          className={twMerge('animate-blank')}
          style={{ animationDelay: `-${Math.random() * 2}s` }}
        />
      ))}
    </div>
  );
});
export default UpperText;
