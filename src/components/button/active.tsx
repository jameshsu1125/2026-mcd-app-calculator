import { memo, useEffect } from 'react';
import './active.less';
import { IReactProps } from '@/settings/type';

const Active = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <div className='active'>{children}</div>;
});
export default Active;
