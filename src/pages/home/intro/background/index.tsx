import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { IntroContext, IntroStepType } from '../config';

const Background = memo(() => {
  const [state] = useContext(IntroContext);

  const [style, setStyle] = useTween({ backgroundColor: '#000' });

  useEffect(() => {
    if (state.step === IntroStepType.fadeIn) {
      //setStyle({ backgroundColor: '#ffcc00' });
    }
  }, [state.step]);

  return <div className='absolute top-0 h-full w-full bg-black' style={style} />;
});
export default Background;
