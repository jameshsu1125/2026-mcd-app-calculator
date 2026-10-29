import { Context } from '@/settings/constant';
import { ActionType, LoadingProcessVersion } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { ResultContext, ResultState, ResultStepType } from './config';
import Idle from './idle';
import './index.less';
import ItemList from './itemList';
import Strategy from './strategy';
import Group from './strategy/group';
import { trackPageView } from '@/utils';

const Result = memo(() => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [{ userResult }, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  useEffect(() => {
    setContext({
      type: ActionType.Scroll,
      state: { enabled: true, version: LoadingProcessVersion.Legacy, body: 'Loading...' },
    });
    trackPageView('/result', '結果頁');
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, target: targetRef.current }));
  }, [targetRef]);

  return (
    <ResultContext.Provider value={[state, setState]} key={JSON.stringify(userResult)}>
      <OnloadProvider
        onload={() => {
          setState((prev) => ({ ...prev, step: ResultStepType.fadeIn }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Result'>
          <div className='w-full' ref={targetRef}>
            <Idle />
            <ItemList />
            <Strategy />
          </div>
          <Group />
        </div>
      </OnloadProvider>
    </ResultContext.Provider>
  );
});
export default Result;
