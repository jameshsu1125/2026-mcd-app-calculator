import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext } from 'react';
import { INFO_MODAL_BODY } from './config';
import { trackCustomEvent } from '@/utils';

type InfoProps = {
  shouldFadeIn: boolean;
  onEnd?: () => void;
  isReverse?: boolean;
};

const Info = memo(({ shouldFadeIn, onEnd, isReverse }: InfoProps) => {
  const [, setContext] = useContext(Context);
  return (
    <TweenerDivProvider
      initialStyle={{ opacity: 0, y: -50 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{
        duration: 300,
        easing: Bezier.outBack,
        onEnd: () => {
          onEnd?.();
        },
      }}
      shouldFadeIn={shouldFadeIn}
    >
      <Button
        id='info'
        onClick={() => {
          setContext({
            type: ActionType.Modal,
            state: { enabled: true, body: INFO_MODAL_BODY, className: '' },
          });
          trackCustomEvent('保護文字按鍵');
        }}
      >
        <Button.Info isReverse={isReverse} />
      </Button>
    </TweenerDivProvider>
  );
});
export default Info;
