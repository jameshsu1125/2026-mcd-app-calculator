import { memo } from 'react';
import './index.less';
import Logo from './logo';
import Pattern from './pattern';

const End = memo(() => (
  <div className='End'>
    <Logo />
    <Pattern />
  </div>
));
export default End;
