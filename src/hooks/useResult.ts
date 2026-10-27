import { Keyboards } from '@/pages/home/calculator/config';
import { Context } from '@/settings/constant';
import { useContext, useMemo } from 'react';
import { McdCategory, McdDeal, solveMcdDeal } from './useMcdDeal';

const COUPON_TYPE: Record<McdDeal['source'], string> = {
  star: '1+1 星級點',
  sweetheart: '數位甜心卡',
  bogo: '買一送一',
  meal_gift: '買套餐送贈品',
  spend: '滿額送',
};

type TProduct = { id: string; name: string; className: string };

export type Coupons = {
  type: string;
  title: string;
  products: any[];
  items: any[];
  original: number;
  paid: number;
  savings: number;
  itemCount: number;
}[];

// 按鍵 id → 商品名稱與 className（兩個時段的鍵盤合在一起查；同一個 id 在
// 兩個時段的 className 相同）
const PRODUCTS = new Map<string, TProduct>(
  [...Keyboards.breakfast, ...Keyboards.allDay].map((key) => [
    key.id,
    { id: key.id, name: key.name, className: key.className },
  ]),
);

const toProduct = (id: string): TProduct => {
  const product = PRODUCTS.get(id);
  return { id, name: product?.name ?? id, className: product?.className ?? '' };
};

// 數量最多的分類平手時，照這個順序決定誰優先（James 2026-10-27：平手時
// 獨自清醒＝咖啡／茶 排第一；其他維持原本的順序）。要調整就改這個陣列。
const CATEGORY_TIE_PRIORITY: McdCategory[] = ['咖啡／茶', '肉類', '炸物', '湯／甜點／飲料', 'none'];

const useResult = () => {
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
    const selected = userResult.input.map((input) => toProduct(input.dataset.id));

    // 2. 券帶出來、但使用者沒按的商品（一份算一個，例如沒按薯條但套餐配
    //    中薯又送中薯，就是薯條 ×2；沒有按鍵的四季沙拉不列）
    const extraCount = new Map<string, number>();
    result.deals.forEach((deal) =>
      deal.products
        .filter((product) => product.button && !selectedIds.has(product.button))
        .forEach((product) =>
          extraCount.set(product.button!, (extraCount.get(product.button!) ?? 0) + 1),
        ),
    );
    const extras = [...extraCount].map(([id, count]) => ({ ...toProduct(id), count }));

    // 3. 攻略摘要
    // (d) 使用者自己按的商品各分類幾個（James 2026-10-24：券多送的不算）。
    //     每個按下的按鍵算一次，沒有券可用的也算。每個分類都會有 key
    //     （沒有就是 0）。一個按鍵可以有兩個分類（例如麥克鷄塊是炸物＋
    //     肉類），兩邊都會 +1，所以加總可能大於按下的按鍵數。
    //     按鍵的分類從結果裡取：有券的會出現在某張券的 products，沒券的
    //     在 uncovered，兩邊都帶 categories。
    const categoriesOf = new Map<string, McdCategory[]>();
    result.deals.forEach((deal) =>
      deal.products.forEach((product) => {
        if (product.button) categoriesOf.set(product.button, product.categories);
      }),
    );
    result.uncovered.forEach((button) => categoriesOf.set(button.id, button.categories));

    const categoryCount: Record<McdCategory, number> = {
      肉類: 0,
      炸物: 0,
      '湯／甜點／飲料': 0,
      '咖啡／茶': 0,
      none: 0,
    };
    selectedIds.forEach((id) =>
      (categoriesOf.get(id) ?? []).forEach((category) => (categoryCount[category] += 1)),
    );

    // (e) 數量最多的分類；平手時照 CATEGORY_TIE_PRIORITY 決定
    const topCategory = CATEGORY_TIE_PRIORITY.reduce((best, category) =>
      categoryCount[category] > categoryCount[best] ? category : best,
    );

    const summary = {
      savings: result.savingsFrom, // (a) 有機會省最多錢
      itemCount: result.itemCount, // (b) 總共獲得的品項數目
      couponCount: result.deals.length, // (c) 一共幾張券（重複使用的也算）
      categoryCount, // (d) 使用者按的商品各分類幾個
      topCategory, // (e) 數量最多的分類（平手時咖啡／茶優先）
    };

    // 4. 每張券的詳細資料
    const coupons: Coupons = result.deals.map((deal) => {
      const items = deal.breakdown?.items ?? [];
      return {
        type: COUPON_TYPE[deal.source],
        title: deal.title,
        // 這張券拿到的每一份商品（一份一筆，例如買一送一就是兩筆）
        //   role：主餐／配餐／飲料／贈品、紅區／白區、A區／B區（送）、買／送
        //   name：實際品項（例如「雙層牛肉吉事堡」）
        //   buttonName / className：所屬按鍵的名稱與 className
        //   categories：分類陣列（肉類／炸物／湯／甜點／飲料／咖啡／茶），
        //               例如麥克鷄塊是 ['炸物', '肉類']；四季沙拉是 ['none']
        //   isSelected：是不是使用者按的按鍵；false 就是券多帶出來的
        // 只有 B清爽配餐的四季沙拉沒有按鍵，className 是空字串
        products: deal.products.map((product) => ({
          role: product.role,
          name: product.name,
          id: product.button,
          buttonName: product.button ? toProduct(product.button).name : null,
          className: product.button ? toProduct(product.button).className : '',
          categories: product.categories,
          isSelected: product.button ? selectedIds.has(product.button) : false,
        })),
        items,
        original: items.reduce((sum, item) => sum + item.price, 0),
        paid: deal.breakdown?.paid ?? 0,
        savings: deal.savingsMin,
        itemCount: deal.itemCount,
      };
    });

    return { selected, extras, summary, coupons, uncovered: result.uncovered, hints: result.hints };
  }, [userResult, result]);

  return view;
};
export default useResult;
