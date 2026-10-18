import { memo, useEffect } from 'react';
import './keyboard.less';

const Keyboard = memo(({ className }: { className?: string }) => {
  useEffect(() => {}, []);
  return (
    <div className='keyboard'>
      <div className={className} />
    </div>
  );
});
export default Keyboard;
