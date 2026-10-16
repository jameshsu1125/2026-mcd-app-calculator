// Ported from react-div-100vh (https://github.com/mvasin/react-div-100vh, MIT)
import { forwardRef, type HTMLAttributes } from 'react';
import use100vh from './use100vh';

export { use100vh, measureHeight } from './use100vh';

let warned = false;

/** 高度等於真實可視高度的 div，解決手機瀏覽器 100vh 被網址列蓋住的問題 */
const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...other }, ref) => {
    const height = use100vh();

    if (import.meta.env.DEV && !warned && style?.height) {
      warned = true;
      console.warn('<Container /> overrides the height property of the style prop');
    }

    return (
      <div ref={ref} style={{ ...style, height: height ? `${height}px` : '100vh' }} {...other}>
        <div className='flex h-full w-full justify-center'>
          <div className='relative w-full max-w-xl'>{children}</div>
        </div>
      </div>
    );
  },
);

Container.displayName = 'Container';

export default Container;
