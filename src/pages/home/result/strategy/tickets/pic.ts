import { Coupons } from '@/hooks/useResult';

// 票券左右兩格（A＝買／紅區／A區／主餐，B＝送／白區／B區／贈品）的商品與圖片
// className。圖片在 ./pic/，class 對應寫在 ./pic.less。
//
// 資料來源：useResult 的 coupon.products（一份一筆，帶 role / name）。
// 每種券用 role 找出 A、B 兩格，再用「券種＋品名」查 className。
// 查不到的品名回傳空字串（.pic 不顯示圖），新增品項時補下面的表即可。

type Coupon = Coupons[number];
type Product = Coupon['products'][number];
export type TicketSide = { product: Product; picClass: string };

// 每種券 A、B 兩格各取哪個 role
const SIDE_ROLE: Record<string, { a: string; b: string }> = {
  買一送一: { a: '買', b: '送' },
  數位甜心卡: { a: 'A區', b: 'B區（送）' },
  '1+1 星級點': { a: '紅區', b: '白區' },
  買套餐送贈品: { a: '主餐', b: '贈品' },
};

// 品名 → className（不含套餐的 ABC／DE 後綴）
const BOGO: Record<string, string> = {
  // 冰／熱共用一張（James 2026-10-28），圖取自甜心卡的金選美式咖啡(熱)
  '金選美式咖啡(冰/熱)': 'pic-bogo-gold-americano',
  '焦糖奶茶(冰)': 'pic-bogo-caramel-milk-tea',
  '中杯可樂(含zero)/雪碧': 'pic-bogo-coke-m',
  '中杯檸檬風味紅茶(冰)': 'pic-bogo-lemon-tea-m',
  中杯無糖茶: 'pic-bogo-green-tea-m',
  薯餅: 'pic-bogo-hash-brown',
  '勁辣香鷄翅(一份兩塊)': 'pic-bogo-wings',
};

const STAR: Record<string, string> = {
  麥香鷄: 'pic-star-mcchicken',
  麥克雙牛堡: 'pic-star-double-beef',
  '麥克鷄塊(4塊)': 'pic-star-nuggets-4',
  '勁辣香鷄翅(一份兩塊)': 'pic-star-wings',
  '麥脆鷄腿(1塊)(原味/辣味)': 'pic-star-drumstick',
  蘋果派: 'pic-star-apple-pie',
  '薯條(小包)': 'pic-star-fries-s',
  大蛋捲冰淇淋: 'pic-star-cone-l',
  麥香魚: 'pic-star-filet',
  OREO冰炫風: 'pic-star-oreo-flurry',
  '可口可樂(小)': 'pic-star-coke-s',
  '冰檸檬風味紅茶(小)': 'pic-star-lemon-tea-s',
};

const SWEETHEART_A: Record<string, string> = {
  冰經典美式咖啡: 'pic-sweet-a-americano-iced',
  '可口可樂(中)': 'pic-sweet-a-coke-m',
  '冰檸檬風味紅茶(中)': 'pic-sweet-a-lemon-tea-m',
  '麥克鷄塊(4塊)': 'pic-sweet-a-nuggets-4',
  OREO冰炫風: 'pic-sweet-a-oreo-flurry',
  '玉米湯(大)': 'pic-sweet-a-corn-soup-l',
  '薯條(大)': 'pic-sweet-a-fries-l',
};

const SWEETHEART_B: Record<string, string> = {
  '可口可樂(中)': 'pic-sweet-b-coke-m',
  熱紅茶: 'pic-sweet-b-black-tea-hot',
  冰經典美式咖啡: 'pic-sweet-b-americano-iced',
  蛋捲冰淇淋: 'pic-sweet-b-cone',
  薯餅: 'pic-sweet-b-hash-brown',
  '薯條(小)': 'pic-sweet-b-fries-s',
};

const BREAKFAST_MEAL: Record<string, string> = {
  現烤焙果: 'pic-meal-bf-bagel',
  吉事蛋堡: 'pic-meal-bf-cheese-egg-burger',
  麥香魚: 'pic-meal-bf-filet',
  麥香鷄: 'pic-meal-bf-mcchicken',
  豬肉滿福堡: 'pic-meal-bf-sausage-muffin',
  '麥克鷄塊(6塊)': 'pic-meal-bf-nuggets-6',
  '鬆餅(3片)': 'pic-meal-bf-hotcakes',
};

const BREAKFAST_GIFT: Record<string, string> = {
  薯餅: 'pic-meal-bf-gift-hash-brown',
  '麥克鷄塊(4塊)': 'pic-meal-bf-gift-nuggets-4',
  '玉米湯(小)': 'pic-meal-bf-gift-corn-soup-s',
};

// 超值全餐：圖分 ABC 餐、DE 餐（DE 多一份小薯），className 會再接 -abc / -de
// 麥脆鷄腿(2塊) 客戶沒給圖，先用辣味麥脆鷄腿（James 2026-10-28）
const REGULAR_MEAL: Record<string, string> = {
  雙層牛肉吉事堡: 'pic-meal-double-cheeseburger',
  麥香鷄: 'pic-meal-mcchicken',
  麥香魚: 'pic-meal-filet',
  '麥克鷄塊(6塊)': 'pic-meal-nuggets-6',
  '麥脆鷄腿(2塊)': 'pic-meal-drumstick',
};

const REGULAR_GIFT: Record<string, string> = {
  '薯條(中)': 'pic-meal-gift-fries-m',
  '麥克鷄塊(4塊)': 'pic-meal-gift-nuggets-4',
  '玉米湯(小)': 'pic-meal-gift-corn-soup-s',
};

// 套餐券的時段與配餐看標題：「買早餐套餐送…」是早餐；
// 「買超值全餐送中薯（D炫冰配餐＋汽水）」括號裡第一個字母是配餐
const isBreakfastMeal = (title: string) => title.startsWith('買早餐套餐');
const mealVariant = (title: string) => (/（[DE]/.test(title) ? 'de' : 'abc');

const picClassOf = (coupon: Coupon, side: 'a' | 'b', name: string): string => {
  switch (coupon.type) {
    case '買一送一':
      return BOGO[name] ?? '';
    case '1+1 星級點':
      return STAR[name] ?? '';
    case '數位甜心卡':
      return (side === 'a' ? SWEETHEART_A : SWEETHEART_B)[name] ?? '';
    case '買套餐送贈品': {
      if (isBreakfastMeal(coupon.title)) {
        return (side === 'a' ? BREAKFAST_MEAL : BREAKFAST_GIFT)[name] ?? '';
      }
      if (side === 'b') return REGULAR_GIFT[name] ?? '';
      const base = REGULAR_MEAL[name];
      return base ? `${base}-${mealVariant(coupon.title)}` : '';
    }
    default:
      return '';
  }
};

export const getTicketSides = (coupon: Coupon): { a: TicketSide; b: TicketSide } => {
  const roles = SIDE_ROLE[coupon.type];
  const find = (side: 'a' | 'b', fallback: number): TicketSide => {
    const product =
      (roles && coupon.products.find((p: Product) => p.role === roles[side])) ??
      coupon.products[fallback];
    return { product, picClass: product ? picClassOf(coupon, side, product.name) : '' };
  };
  return { a: find('a', 0), b: find('b', coupon.products.length - 1) };
};
