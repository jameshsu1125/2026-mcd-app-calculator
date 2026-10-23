import Blockquote from '@/components/blockquote';
import useResult from '@/hooks/useResult';
import { MAXIMAL_SAVING_AMOUNT, MINIMAL_SAVING_AMOUNT } from '@/settings/config';
import { memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import Info from '../../info';
import Logo from '../../logo';
import './index.less';

const CATEGORY_TYPE_TO_CLASS = {
  肉類: 'meat',
  炸物: 'fried',
  '湯／甜點／飲料': 'soup-dessert-drink',
  '咖啡／茶': 'coffee-tea',
  none: 'none',
} as const;

const Idle = memo(() => {
  const view = useResult();

  const IdleType = useMemo(() => {
    if (!view) return 'none';

    // return '5';

    if (view.summary.savings <= MINIMAL_SAVING_AMOUNT) return '4';
    if (view.summary.savings >= MAXIMAL_SAVING_AMOUNT) return '3';

    const { categoryCount } = view.summary;

    const topCategoryType = (Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      'none') as keyof typeof CATEGORY_TYPE_TO_CLASS;

    switch (topCategoryType) {
      case '肉類':
        return '0';
      case '炸物':
        return '1';
      case '湯／甜點／飲料':
        return '2';
      case '咖啡／茶':
        return '5';
    }
    return 'none';
  }, [view]);

  return (
    <div className='Idle'>
      <div className='w-full pt-[5%]'>
        <div className='relative flex w-full items-start justify-center'>
          <div className='relative flex w-full flex-col items-center justify-center'>
            <Blockquote className='max-w-md items-start justify-between'>
              <Info shouldFadeIn isReverse />
              <Logo shouldFadeIn className='mt-6' />
              <div className='opacity-0' />
            </Blockquote>
            <div className='relative flex w-full flex-col items-center justify-center gap-2 px-5'>
              <Blockquote className='justify-center'>
                <div className={twMerge('headline', `headline-${IdleType}`)} />
              </Blockquote>
              <Blockquote className='justify-center'>
                <div className={twMerge('subline', `subline-${IdleType}`)} />
              </Blockquote>
              <Blockquote className='justify-center pt-8'>
                <div className={twMerge('idle', `idle-${IdleType}`)} />
              </Blockquote>
              <div className='fast-pass' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Idle;
