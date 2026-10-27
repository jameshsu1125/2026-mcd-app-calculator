import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { memo, useContext } from 'react';
import McdLoading from '../mcdLoading';
import './index.less';

const Background = () => <div className='bg-backgroundColor/90 absolute top-0 h-full w-full' />;

const Dots = () => (
  <span className='ml-0.5 inline-flex space-x-0.5'>
    <i className='dot dot-1' />
    <i className='dot dot-2' />
    <i className='dot dot-3' />
  </span>
);

const Text = ({ children }: IReactProps) => (
  <span className='text-primary relative ml-2 text-xs'>
    {children}
    <Dots />
  </span>
);

const LoadingProcess = memo(() => {
  const [context] = useContext(Context);
  const data = context[ActionType.LoadingProcess];
  return (
    <div className='LoadingProcess fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center space-y-0'>
      <Background />
      <McdLoading className='relative' size={200} showText={false} />
      {data?.body && <Text>{data.body.replace(/[.。…]+$/, '')}</Text>}
    </div>
  );
});
export default LoadingProcess;
