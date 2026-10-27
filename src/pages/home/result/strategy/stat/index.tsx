import InView from '@/components/inView';
import useResult from '@/hooks/useResult';
import useTween from 'lesca-use-tween';
import { memo, useEffect, useMemo, useState } from 'react';
import './index.less';

const Counter = memo(({ count, shouldAnimate }: { count: number; shouldAnimate: boolean }) => {
  const [style, setStyle] = useTween({ left: 0 });

  useEffect(() => {
    if (shouldAnimate) {
      const duration = count * 30;
      setStyle({ left: count }, { duration: duration < 500 ? 500 : duration });
    }
  }, [shouldAnimate, count]);

  return <div className='count'>{Math.floor(Number(style.left || 0))}</div>;
});

const Stat = memo(() => {
  const view = useResult();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { itemCount, savings, couponCount } = useMemo(() => {
    if (!view) return { itemCount: 0, savings: 0, couponCount: 0 };
    return view.summary;
  }, [view]);

  return (
    <InView className='Stat' threshold={100} onEnter={() => setShouldAnimate(true)}>
      <div className='box'>
        <div>
          <div className='title' />
          <Counter count={savings} shouldAnimate={shouldAnimate} />
        </div>
        <div>
          <div className='title' />
          <Counter count={itemCount} shouldAnimate={shouldAnimate} />
        </div>
        <div>
          <div className='title' />
          <Counter count={couponCount} shouldAnimate={shouldAnimate} />
        </div>
      </div>
    </InView>
  );
});
export default Stat;
