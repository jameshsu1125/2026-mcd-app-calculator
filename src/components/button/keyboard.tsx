import { memo } from 'react';
import './keyboard.less';

const Keyboard = memo(({ className }: { className?: string }) => (
  <div className='keyboard'>
    <div className={className} />
  </div>
));
export default Keyboard;
