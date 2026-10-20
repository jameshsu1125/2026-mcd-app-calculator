import { memo, useContext, useEffect } from 'react';
import './index.less';
import { Context } from '@/settings/constant';

const Result = memo(() => {
  const [{ userResult }] = useContext(Context);

  useEffect(() => {
    console.log(userResult?.input);
  }, [userResult]);

  return <div className='Result'>Result</div>;
});
export default Result;
