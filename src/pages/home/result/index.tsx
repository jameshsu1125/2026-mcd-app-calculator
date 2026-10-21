import useResult from '@/hooks/useResult';
import { memo } from 'react';
import './index.less';

const Result = memo(() => {
  const view = useResult();

  return (
    <div className='Result'>
      <div className='bg-neutral-primary-soft border-default bg-secondary hover:bg-neutral-secondary-medium block max-w-sm rounded-xl border p-6 shadow-xs'>
        <h5 className='text-heading mb-3 text-2xl leading-8 font-semibold tracking-tight'>
          所選商品
        </h5>
        <div className='text-body'>
          {view?.selected.map((item) => item.name).join('、') || '尚未選擇商品'}
        </div>
      </div>
      <div className='bg-neutral-primary-soft border-default bg-secondary hover:bg-neutral-secondary-medium block max-w-sm rounded-xl border p-6 shadow-xs'>
        <h5 className='text-heading mb-3 text-2xl leading-8 font-semibold tracking-tight'>多享</h5>
        <div className='text-body'>
          {view?.extras.map((item) => item.name).join('、') || '尚未選擇商品'}
        </div>
      </div>
      <div className='bg-neutral-primary-soft border-default bg-secondary hover:bg-neutral-secondary-medium block max-w-sm rounded-xl border p-6 shadow-xs'>
        <h5 className='text-heading mb-3 text-2xl leading-8 font-semibold tracking-tight'>
          攻略摘要
        </h5>
        <div className='text-body'>
          {view?.summary ? (
            <>
              <div>有機會省最多錢: {view.summary.savings}</div>
              <div>獲得品項: {view.summary.itemCount}</div>
              <div>適用攻略: {view.summary.couponCount}</div>
            </>
          ) : (
            '尚未選擇商品'
          )}
        </div>
      </div>
      <div className='bg-neutral-primary-soft border-default bg-secondary hover:bg-neutral-secondary-medium block max-w-sm rounded-xl border p-6 shadow-xs'>
        <h5 className='text-heading mb-3 text-2xl leading-8 font-semibold tracking-tight'>攻略</h5>
        <div className='text-body'>
          {view && view.coupons.length > 0
            ? view.coupons.map((coupon, index) => (
                <div key={`${coupon.title}-${index}`}>
                  <div>{`攻略 ${index + 1}:`}</div>
                  <div>{coupon.title}</div>
                </div>
              ))
            : '尚未選擇商品'}
        </div>
      </div>
    </div>
  );
});
export default Result;
