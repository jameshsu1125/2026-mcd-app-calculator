// Ported from react-div-100vh (https://github.com/mvasin/react-div-100vh, MIT)
import { useEffect, useState } from 'react';

const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const measureHeight = (): number | null => (isClient() ? window.innerHeight : null);

// 與 SSR 的第一次 render 保持一致，client mount 後才回傳實際量測高度
const useWasRenderedOnClientAtLeastOnce = () => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (isClient()) setRendered(true);
  }, []);

  return rendered;
};

/** 回傳真實可視高度（px），SSR 時為 null */
export const use100vh = (): number | null => {
  const [height, setHeight] = useState<number | null>(measureHeight);
  const rendered = useWasRenderedOnClientAtLeastOnce();

  useEffect(() => {
    if (!rendered) return;
    const onResize = () => setHeight(measureHeight());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [rendered]);

  return rendered ? height : null;
};

export default use100vh;
