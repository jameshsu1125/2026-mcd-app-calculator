import { Context } from '@/settings/constant';
import { memo, useContext, useEffect, useId } from 'react';
import Button from '../button';
import './index.less';
import Click from 'lesca-click';
import { ActionType } from '@/settings/type';
import TweenerDivProvider from '../tweenerProvider';
import { twMerge } from 'tailwind-merge';

const Modal = memo(() => {
  const [{ modal }, setContext] = useContext(Context);

  const id = useId();

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setContext({ type: ActionType.Modal, state: { enabled: false } });
    });
    Click.addPreventExcept(`#${id}`);
  }, [id]);

  return (
    <div className='Modal'>
      <TweenerDivProvider
        id={id}
        className='bg'
        shouldFadeIn
        initialStyle={{ opacity: 0 }}
        tweenTo={{ opacity: 1 }}
        options={{ duration: 150 }}
      />
      <div className='inner'>
        <TweenerDivProvider
          className={twMerge('dialog pointer-events-auto', 'py-24', modal?.className)}
          shouldFadeIn
          initialStyle={{ opacity: 0, y: 50 }}
          tweenTo={{ opacity: 1, y: 0 }}
          options={{ duration: 300, delay: 150 }}
        >
          <div className='body'>{modal?.body}</div>
          <div className='close'>
            <Button
              onClick={() => {
                setContext({ type: ActionType.Modal, state: { enabled: false } });
              }}
            >
              <Button.Close size='large' />
            </Button>
          </div>
        </TweenerDivProvider>
      </div>
    </div>
  );
});
export default Modal;
