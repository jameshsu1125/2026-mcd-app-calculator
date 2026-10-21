import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import Contain from '@/components/contain';
import { memo, useContext, useEffect, useState } from 'react';
import { CalculatorContext, CalculatorState, CalculatorStepType } from './config';
import './index.less';
import Info from '../info';
import Instructions from './instructions';
import Keyboard from './keyboard';
import Logo from './logo';
import Screen from './screen';

const Calculator = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(CalculatorState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <CalculatorContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          setState((prev) => ({ ...prev, step: CalculatorStepType.fadeIn }));
        }}
      >
        <div className='Calculator'>
          <Contain>
            <div className='blockquote items-start justify-between'>
              <Info />
              <Logo />
              <div className='opacity-0' />
            </div>
            <Screen />
            <Keyboard />
          </Contain>
          {state.instructionState.enabled && <Instructions />}
        </div>
      </OnloadProvider>
    </CalculatorContext.Provider>
  );
});
export default Calculator;
