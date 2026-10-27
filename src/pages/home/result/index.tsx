import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { ResultContext, ResultState, ResultStepType } from './config';
import Idle from './idle';
import './index.less';
import ItemList from './itemList';
import Strategy from './strategy';

const Result = memo(() => {
  const [{ userResult }, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true, body: '計算中' } });
    setContext({ type: ActionType.Scroll, state: { enabled: true } });
  }, []);

  return (
    <ResultContext.Provider value={[state, setState]} key={JSON.stringify(userResult)}>
      <OnloadProvider
        onload={() => {
          setTimeout(() => {
            setState((prev) => ({ ...prev, step: ResultStepType.fadeIn }));
            setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          }, 1500);
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
