import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { ResultContext, ResultState, ResultStepType } from './config';
import Idle from './idle';
import './index.less';
import ItemList from './itemList';
import Strategy from './strategy';
import Group from './strategy/group';

const Result = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  // const view = useResult();

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    setContext({ type: ActionType.Scroll, state: { enabled: true } });
  }, []);

  return (
    <ResultContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((prev) => ({ ...prev, step: ResultStepType.fadeIn }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Result'>
          <Idle />
          <ItemList />
          <Strategy />
        </div>
      </OnloadProvider>
    </ResultContext.Provider>
  );
});
export default Result;
