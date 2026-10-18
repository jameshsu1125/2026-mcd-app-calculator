import Toast from '@/components/toast';
import { memo, useLayoutEffect, useState } from 'react';
import './index.less';

type FocusProps = {
  target: string;
  number: number;
  text: string;
  directionX?: 'LEFT' | 'RIGHT';
  directionY?: 'UP' | 'DOWN';
};

const Focus = memo(({ target, number, text, directionX, directionY }: FocusProps) => {
  const [bounds, setBounds] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const updateBounds = () => {
      const currentTarget = document.querySelector(target);
      setBounds(currentTarget?.getBoundingClientRect() ?? null);
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, true);

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds, true);
    };
  }, []);

  if (!bounds) return null;

  return (
    <div
      style={{
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
      }}
      className='switch'
    >
      <Toast number={number} directionX={directionX} directionY={directionY}>
        {text}
      </Toast>
    </div>
  );
});

const Instructions = memo(() => {
  return (
    <div className='Instructions'>
      <div className='bg' />
      <div className='absolute h-full w-full'>
        <Focus target='.Calculator .contain .switch' number={1} text='切換早餐時段／午晚餐時段' />
        <Focus target='.Calculator .contain .msoda' number={2} text='選擇2-6個想要的美味' />
        <Focus target='.Calculator .contain .del' number={3} text='改變心意，可刪除' />
        <Focus
          target='.Calculator .contain .enter'
          number={4}
          text='改變心意，可刪除'
          directionX='RIGHT'
        />

        <Focus
          target='.Calculator .contain #info'
          number={5}
          text='點此查看優惠計算範圍與說明　'
          directionY='DOWN'
        />
      </div>
    </div>
  );
});
export default Instructions;
