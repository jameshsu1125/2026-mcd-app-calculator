import Blockquote from '@/components/blockquote';
import Contain from '@/components/contain';
import HiddenDiscount, { isHiddenDiscountAvailable } from '@/components/hiddenDiscount';
import { Context } from '@/settings/constant';
import { ActionType, LoadingProcessVersion } from '@/settings/type';
import Click from 'lesca-click';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Info from '../info';
import Logo from '../logo';
import { CalculatorContext, CalculatorState, CalculatorStepType } from './config';
import './index.less';
import Instructions from './instructions';
import Keyboard from './keyboard';
import Screen from './screen';
import { trackPageView } from '@/utils';
import QueryString from 'lesca-url-parameters';

const Calculator = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(CalculatorState);

  useEffect(() => {
    setContext({
      type: ActionType.LoadingProcess,
      state: { enabled: true, version: LoadingProcessVersion.Legacy, body: 'Loading...' },
    });
    trackPageView('/calculator', '計算機頁');
  }, []);

  // 教學已被略過時，直接進入計算機
  useEffect(() => {
    if (!state.instructionState.enabled && state.step === CalculatorStepType.infoDidFadeIn) {
      setState((prev) => ({ ...prev, step: CalculatorStepType.startCalculator }));
    }
  }, [state.step, state.instructionState.enabled]);

  useEffect(() => {
    Click.setEnabled(false);
    return () => {
      Click.setEnabled(true);
    };
  }, []);

  useEffect(() => {
    const shouldDisplayHiddenDiscount = QueryString.get('hiddenDiscount') === '1';
    if (!isHiddenDiscountAvailable() && !shouldDisplayHiddenDiscount) return;

    const discountsArrays = ['mcd', 'chicken', 'mcf', 'mcn', 'mfries'];
    const getHiddenDiscounts = (ordered: boolean) => {
      const hidden = state.hiddenDiscounts;
      if (hidden.length !== discountsArrays.length) return false;
      if (ordered) return hidden.every((item, i) => item === discountsArrays[i]);
      const set = new Set(hidden);
      return set.size === discountsArrays.length && discountsArrays.every((item) => set.has(item));
    };
    if (getHiddenDiscounts(true)) {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          className: 'pb-5',
          body: (
            <>
              <HiddenDiscount />
            </>
          ),
        },
      });
    }
  }, [state.hiddenDiscounts]);

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
