import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import TweenerDivProvider from '../tweenerProvider';

type ToastProps = IReactProps & {
  number: number;
  directionX?: 'LEFT' | 'RIGHT';
  directionY?: 'UP' | 'DOWN';
  shouldFadeIn: boolean;
};

const Toast = memo(({ children, number, directionX, directionY, shouldFadeIn }: ToastProps) => (
  <div className='Toast'>
    <TweenerDivProvider
      initialStyle={{ opacity: 0, scale: 0 }}
      tweenTo={{ opacity: 1, scale: 1 }}
      options={{ duration: 300 }}
      shouldFadeIn={shouldFadeIn}
      className={twMerge('toast', directionX || 'LEFT', directionY || 'UP')}
      style={{
        transformOrigin: `${(directionX || 'LEFT') === 'LEFT' ? '-10%' : '110%'} ${(directionY || 'UP') === 'UP' ? '100%' : '10%'}`,
      }}
    >
      <div className={`number-${number}`} />
      <span>{children}</span>
    </TweenerDivProvider>
  </div>
));
export default Toast;
