import useResult from '@/hooks/useResult';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { ResultContext, ResultState, ResultStepType } from './config';
import Idle from './idle';
import './index.less';

const Result = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  const view = useResult();

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
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
        </div>
      </OnloadProvider>
    </ResultContext.Provider>
  );
});
export default Result;
