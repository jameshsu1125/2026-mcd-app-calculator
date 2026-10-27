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
import Logo from '../logo';
import Screen from './screen';
import Blockquote from '@/components/blockquote';
import Click from 'lesca-click';

const Calculator = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(CalculatorState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    Click.setEnabled(false);
    return () => {
      Click.setEnabled(true);
    };
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
          <Contain paddingBlock='5%' allowScroll>
            <Blockquote className='blockquote items-start justify-between'>
              <Info
                shouldFadeIn={state.step === CalculatorStepType.keyboardDidFadeIn}
                onEnd={() => {
                  setState((prev) => ({ ...prev, step: CalculatorStepType.infoDidFadeIn }));
                }}
              />
              <Logo shouldFadeIn={state.step === CalculatorStepType.fadeIn} shouldShadow />
              <div className='opacity-0' />
            </Blockquote>
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
