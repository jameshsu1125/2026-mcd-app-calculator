import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { CalculatorContext, CalculatorState } from './config';
import './index.less';
import InstructionsForUse from './instructionsForUse';
import Keyboard from './keyboard';
import Screen from './screen';

const Calculator = memo(() => {
  const [, setContext] = useContext(Context);
  const value = useState(CalculatorState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <CalculatorContext.Provider value={value}>
      <OnloadProvider
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Calculator'>
          <div className='inner'>
            <div className='contain'>
              <div className='blockquote items-start justify-between'>
                <Button>
                  <Button.Info />
                </Button>
                <div className='logo' />
                <div className='opacity-0' />
              </div>
              <Screen />
              <Keyboard />
            </div>
          </div>
          <InstructionsForUse />
        </div>
      </OnloadProvider>
    </CalculatorContext.Provider>
  );
});
export default Calculator;
