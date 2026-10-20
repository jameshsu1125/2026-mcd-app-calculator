import { solveMcdDeal, type McdDeal } from '@/hooks/useMcdDeal';
import { Context } from '@/settings/constant';
import { memo, useContext, useEffect, useMemo } from 'react';
import { Keyboards } from '../calculator/config';
import './index.less';

const COUPON_TYPE: Record<McdDeal['source'], string> = {
  star: '1+1 星級點',
  sweetheart: '數位甜心卡',
  bogo: '買一送一',
  meal_gift: '買套餐送贈品',
  spend: '滿額送',
};

// 按鍵 id → 中文名稱（兩個時段的鍵盤合在一起查）
const BUTTON_NAME = new Map<string, string>(
  [...Keyboards.breakfast, ...Keyboards.allDay].map((key) => [key.id, key.name]),
);

const Result = memo(() => {
  const [{ userResult }] = useContext(Context);

  const result = useMemo(() => {
    if (!userResult) return null;
    const timeSlot = userResult.time === 'breakfast' ? 'breakfast' : 'regular';
    const ids = userResult.input.map((input) => input.dataset.id);
    return solveMcdDeal(timeSlot, ids, 'max_savings');
  }, [userResult]);

  // 把 result 依需求分成四類，資料結構本身不動
  const view = useMemo(() => {
    if (!userResult || !result) return null;
    const selectedIds = new Set(userResult.input.map((input) => input.dataset.id));

    // 1. 使用者所選的商品
    const selected = userResult.input.map((input) => input.dataset);

    // 2. 券帶出來、但使用者沒按的商品（同一張券用兩次就算兩份）
    const extraCount = new Map<string, number>();
    result.deals.forEach((deal) =>
      deal.covers
        .filter((id) => !selectedIds.has(id))
        .forEach((id) => extraCount.set(id, (extraCount.get(id) ?? 0) + 1)),
    );
    const extras = [...extraCount].map(([id, count]) => ({
      id,
      name: BUTTON_NAME.get(id) ?? id,
      count,
    }));

    // 3. 攻略摘要
    const summary = {
      savings: result.savingsFrom, // (a) 有機會省最多錢
      itemCount: result.itemCount, // (b) 總共獲得的品項數目
      couponCount: result.deals.length, // (c) 一共幾張券（重複使用的也算）
    };

    // 4. 每張券的詳細資料
    const coupons = result.deals.map((deal) => {
      const items = deal.breakdown?.items ?? [];
      return {
        type: COUPON_TYPE[deal.source],
        title: deal.title,
        items,
        original: items.reduce((sum, item) => sum + item.price, 0),
        paid: deal.breakdown?.paid ?? 0,
        savings: deal.savingsMin,
        itemCount: deal.itemCount,
      };
    });

    return { selected, extras, summary, coupons, uncovered: result.uncovered, hints: result.hints };
  }, [userResult, result]);

  useEffect(() => {
    if (!view) return;
    console.log('1. 使用者所選的商品', view.selected);
    console.log('2. 多出來的商品（不是使用者點的）', view.extras);
    console.log('3. 攻略摘要', view.summary);
    console.log('4. 每張券的詳細資料', view.coupons);
    if (view.uncovered.length > 0) console.log('沒有券可用的商品', view.uncovered);
  }, [view]);

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
