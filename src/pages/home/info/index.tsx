import Button from '@/components/button';
import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo } from 'react';

type InfoProps = {
  shouldFadeIn: boolean;
  onEnd?: () => void;
  isReverse?: boolean;
};

const Info = memo(({ shouldFadeIn, onEnd, isReverse }: InfoProps) => (
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
    <Button id='info'>
      <Button.Info isReverse={isReverse} />
    </Button>
  </TweenerDivProvider>
));
export default Info;
