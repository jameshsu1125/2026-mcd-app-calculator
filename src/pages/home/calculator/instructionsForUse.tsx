import { memo, useLayoutEffect, useState } from 'react';
import './instructionsForUse.less';
import Toast from '@/components/toast';

const Switch = memo(() => {
  const [bounds, setBounds] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const updateBounds = () => {
      const target = document.querySelector('.Calculator .contain .switch');
      setBounds(target?.getBoundingClientRect() ?? null);
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
      <Toast number={5}>切換早餐時段／午晚餐時段</Toast>
    </div>
  );
});

const InstructionsForUse = memo(() => {
  return (
    <div className='InstructionsForUse'>
      <div className='bg' />
      <div className='absolute h-full w-full'>
        <Switch />
      </div>
    </div>
  );
});
export default InstructionsForUse;
