import useResult from '@/hooks/useResult';
import { memo, useMemo } from 'react';
import './index.less';

const Stat = memo(() => {
  const view = useResult();

  const { itemCount, savings, couponCount } = useMemo(() => {
    if (!view) return { itemCount: 0, savings: 0, couponCount: 0 };
    return view.summary;
  }, [view]);

  return (
    <div className='Stat'>
      <div className='box'>
        <div>
          <div className='title' />
          <div className='count'>{savings}</div>
        </div>
        <div>
          <div className='title' />
          <div className='count'>{itemCount}</div>
        </div>
        <div>
          <div className='title' />
          <div className='count'>{couponCount}</div>
        </div>
      </div>
    </div>
  );
});
export default Stat;
