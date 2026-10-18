import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';

const Toast = memo(({ children, number }: IReactProps & { number: number }) => {
  useEffect(() => {}, []);
  return (
    <div className='Toast'>
      <div className={`number-${number}`} />
      <span>{children}</span>
    </div>
  );
});
export default Toast;
