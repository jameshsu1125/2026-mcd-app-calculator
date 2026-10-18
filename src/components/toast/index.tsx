import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';
import { twMerge } from 'tailwind-merge';

type ToastProps = IReactProps & {
  number: number;
  directionX?: 'LEFT' | 'RIGHT';
  directionY?: 'UP' | 'DOWN';
};

const Toast = memo(({ children, number, directionX, directionY }: ToastProps) => {
  useEffect(() => {}, []);
  return (
    <div className='Toast'>
      <div className={twMerge('toast', directionX || 'LEFT', directionY || 'UP')}>
        <div className={`number-${number}`} />
        <span>{children}</span>
      </div>
    </div>
  );
});
export default Toast;
