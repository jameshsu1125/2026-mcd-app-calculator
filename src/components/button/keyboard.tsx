import { memo, useEffect } from 'react';
import './keyboard.less';
import { IReactProps } from '@/settings/type';

const Keyboard = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <div className='keyboard'>{children}</div>;
});
export default Keyboard;
