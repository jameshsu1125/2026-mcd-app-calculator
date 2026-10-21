import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';
import { twMerge } from 'tailwind-merge';

type BlockquoteProps = IReactProps & {
  className?: string;
};

const Blockquote = memo(({ children, className }: BlockquoteProps) => {
  useEffect(() => {}, []);
  return <div className={twMerge('Blockquote', className)}>{children}</div>;
});
export default Blockquote;
