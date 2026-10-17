import { memo, useEffect } from 'react';
import './index.less';
import Logo from './logo';
import Pattern from './pattern';

const End = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='End'>
      <Logo />
      <Pattern />
    </div>
  );
});
export default End;
