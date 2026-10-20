import { solveMcdDeal } from '@/hooks/useMcdDeal';
import { Context } from '@/settings/constant';
import { memo, useContext, useEffect, useMemo } from 'react';
import './index.less';

const Result = memo(() => {
  const [{ userResult }] = useContext(Context);

  const result = useMemo(() => {
    if (!userResult) return null;
    const timeSlot = userResult.time === 'breakfast' ? 'breakfast' : 'regular';
    const ids = userResult.input.map((input) => input.dataset.id);
    return solveMcdDeal(timeSlot, ids, 'max_savings');
  }, [userResult]);

  useEffect(() => {
    console.log(userResult, result);
  }, [userResult, result]);

  return <div className='Result'>Result</div>;
});
export default Result;
