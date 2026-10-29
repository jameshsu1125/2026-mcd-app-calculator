import { Context } from '@/settings/constant';
import {
  ActionType,
  IReactProps,
  LoadingProcessType,
  LoadingProcessVersion,
} from '@/settings/type';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import McdLoading from '../mcdLoading';
import './index.less';

const Background = ({ legacy = false }: { legacy?: boolean }) => (
  <div
    className={twMerge(
      'absolute top-0 h-full w-full',
      legacy ? 'bg-backgroundColor opacity-90' : 'bg-backgroundColor/90',
    )}
  />
);

const Dots = () => (
  <span className='ml-0.5 inline-flex space-x-0.5'>
    <i className='dot dot-1' />
    <i className='dot dot-2' />
    <i className='dot dot-3' />
  </span>
);

const LegacyText = ({ children }: IReactProps) => (
  <span className='text-primary relative ml-2 text-xs'>{children}</span>
);

const Text = ({ children }: IReactProps) => (
  <span className='text-primary relative ml-2 text-xs'>
    {children}
    <Dots />
  </span>
);

const LoadingSvg = ({ className, type }: { className: string; type?: LoadingProcessType }) => (
  <div
    className={twMerge(
      className,
      'mask-contain mask-center',
      'h-16 w-16',
      'bg-primary',
      type || LoadingProcessType.Spin,
    )}
  />
);

const LoadingProcess = memo(() => {
  const [context] = useContext(Context);
  const data = context[ActionType.LoadingProcess];
  const isLegacy = data?.version === LoadingProcessVersion.Legacy;

  return (
    <div
      className={twMerge(
        'LoadingProcess fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center',
        isLegacy ? 'space-y-1' : 'space-y-0',
      )}
    >
      <Background legacy={isLegacy} />
      {isLegacy ? (
        <LoadingSvg className='relative' type={data?.type} />
      ) : (
        <McdLoading className='relative' size={200} showText={false} />
      )}
      {data?.body &&
        (isLegacy ? (
          <LegacyText>{data.body}</LegacyText>
        ) : (
          <Text>{data.body.replace(/[.。…]+$/, '')}</Text>
        ))}
    </div>
  );
});
export default LoadingProcess;
