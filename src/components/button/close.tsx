import { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import './close.less';

const Close = memo(({ size }: { size: 'small' | 'large' }) => (
  <div className={twMerge('close', size === 'large' ? 'p-3' : 'p-1')}>
    <IoClose className='h-5 w-5' />
  </div>
));
export default Close;
