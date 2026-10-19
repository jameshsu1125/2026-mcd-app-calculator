import { memo, useEffect } from 'react';
import './skip.less';

const Skip = memo(() => {
  useEffect(() => {}, []);
  return <div className='skip' />;
});
export default Skip;
