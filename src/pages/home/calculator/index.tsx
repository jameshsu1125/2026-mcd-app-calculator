import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useRef, useState } from 'react';
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

  const innerRef = useRef<HTMLDivElement>(null);
  const containRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  // 偵測 children 內容是否超過螢幕高度，超過才開啟 Scroll（容差 2px 避免小數點造成捲軸閃爍）
  useEffect(() => {
    const inner = innerRef.current;
    const contain = containRef.current;
    if (!inner || !contain) return undefined;

    const check = () => setOverflow(contain.scrollHeight - inner.clientHeight > 2);
    const observer = new ResizeObserver(check);
    observer.observe(inner);
    observer.observe(contain);
    check();

    return () => observer.disconnect();
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
          <div ref={innerRef} className={`inner${overflow ? ' scrollable' : ''}`}>
            <div ref={containRef} className='contain'>
              <div className='blockquote items-start justify-center'>
                <Logo />
              </div>
              <Screen />
              <Keyboard />
            </div>
          </div>
          {state.instructionState.enabled && <Instructions />}
        </div>
      </OnloadProvider>
    </CalculatorContext.Provider>
  );
});
export default Calculator;
