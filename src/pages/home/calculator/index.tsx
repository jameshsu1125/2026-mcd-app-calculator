import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect } from 'react';
import './index.less';

const Calculator = memo(() => {
  const [, setContext] = useContext(Context);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <div className='Calculator'>
        <div className='contain'>
          <div className='blockquote items-start justify-between'>
            <Button>
              <Button.Info />
            </Button>
            <div className='logo' />
            <div className='opacity-0' />
          </div>
          <div className='blockquote min-h-36 flex-1 items-stretch justify-between'>
            <div className='input' />
          </div>
          <div className='w-full shrink-0 px-5'>
            <div className='grid w-full grid-cols-4 gap-5'>
              {[...new Array(20).keys()].map((key) => (
                <Button key={key} className='relative w-full pb-[100%]'>
                  <Button.Keyboard>{key}</Button.Keyboard>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Calculator;
