import { trackPageView } from '@/utils';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Background from './background';
import { IntroContext, IntroState, IntroStepType } from './config';
import End from './end';
import FastPass from './fastPass';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType, LoadingProcessVersion } from '@/settings/type';

const Intro = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(IntroState);

  useEffect(() => {
    trackPageView('/intro', '開場動畫頁');
    setContext({
      type: ActionType.LoadingProcess,
      state: { enabled: true, version: LoadingProcessVersion.Legacy, body: 'Loading...' },
    });
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        setState((S) => ({ ...S, step: IntroStepType.fadeIn }));
        setContext({
          type: ActionType.LoadingProcess,
          state: { enabled: false },
        });
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
