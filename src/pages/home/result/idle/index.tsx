import Blockquote from '@/components/blockquote';
import { memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import Info from '../../info';
import Logo from '../../logo';
import './index.less';
import useResult from '@/hooks/useResult';

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
    if (!view) return 'loading';
    const { categoryCount } = view.summary;
    const topCategoryType = (Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      'none') as keyof typeof CATEGORY_TYPE_TO_CLASS;
    return 'fried';
    return CATEGORY_TYPE_TO_CLASS[topCategoryType];
  }, [view]);

  return (
    <div className='Idle'>
      <div className='w-full pt-[5%]'>
        <div className='relative flex w-full items-start justify-center overflow-y-hidden'>
          <div className='relative w-full max-w-md'>
            <Blockquote className='items-start justify-between'>
              <Info shouldFadeIn isReverse />
              <Logo shouldFadeIn className='mt-6' />
              <div className='opacity-0' />
            </Blockquote>
            <div className='flex w-full flex-col items-center justify-center gap-2'>
              <Blockquote>
                <div className={twMerge('headline', 'headline-0')} />
              </Blockquote>
              <Blockquote className='justify-center'>
                <div className={twMerge('subline', 'subline-0')} />
              </Blockquote>
              <Blockquote className='-mb-2 justify-center pt-8'>
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
