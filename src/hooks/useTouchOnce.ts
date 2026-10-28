import Sounds from '@/components/sounds';
import { useEffect, useState } from 'react';

const useTouchOnce = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (state) {
      const SoundsInstance = new Sounds();
      console.log('aaa');
    }
  }, [state]);

  useEffect(() => {
    document.addEventListener('touchstart', () => setState(true), { once: true });
    document.addEventListener('mousedown', () => setState(true), { once: true });
  }, []);

  return [state];
};
export default useTouchOnce;
