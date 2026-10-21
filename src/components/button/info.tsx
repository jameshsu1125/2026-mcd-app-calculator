import { memo, useEffect } from 'react';
import './info.less';
import { twMerge } from 'tailwind-merge';

const Info = memo(({ isReverse }: { isReverse?: boolean }) => {
  useEffect(() => {}, []);
  return <div className={twMerge('info', isReverse && 'info-reverse')}></div>;
});
export default Info;
