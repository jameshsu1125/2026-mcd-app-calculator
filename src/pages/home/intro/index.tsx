import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Background from './background';
import { IntroContext, IntroState, IntroStepType } from './config';
import End from './end';
import FastPass from './fastPass';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const Intro = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(IntroState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true, body: 'Loading' } });
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
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
