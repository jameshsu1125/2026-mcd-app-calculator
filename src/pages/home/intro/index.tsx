import { trackPageView } from '@/utils';
import OnloadProvider from 'lesca-react-onload';
import { memo, useEffect, useState } from 'react';
import Background from './background';
import { IntroContext, IntroState, IntroStepType } from './config';
import End from './end';
import FastPass from './fastPass';
import './index.less';

const Intro = memo(() => {
  const [state, setState] = useState(IntroState);

  useEffect(() => {
    trackPageView('/intro', '開場動畫頁');
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        setState((S) => ({ ...S, step: IntroStepType.fadeIn }));
      }}
    >
      <div className='Intro'>
        <IntroContext.Provider value={[state, setState]}>
          <Background />
          {state.appendFastPass && <FastPass />}
          <End />
        </IntroContext.Provider>
      </div>
    </OnloadProvider>
  );
});
export default Intro;
