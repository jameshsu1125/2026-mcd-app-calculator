// Ported from react-div-100vh (https://github.com/mvasin/react-div-100vh, MIT)
import { forwardRef, useEffect, type HTMLAttributes } from 'react';
import use100vh from './use100vh';
import Click from 'lesca-click';

export { use100vh, measureHeight } from './use100vh';

let warned = false;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** true：內容超出時可垂直捲動；false（預設）：不可捲動 */
  scroll?: boolean;
};

/** 高度等於真實可視高度的 div，解決手機瀏覽器 100vh 被網址列蓋住的問題 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ style, children, scroll = false, ...other }, ref) => {
    const height = use100vh();

    if (import.meta.env.DEV && !warned && style?.height) {
      warned = true;
      console.warn('<Container /> overrides the height property of the style prop');
    }

    useEffect(() => {
      Click.setEnabled(!scroll);
    }, [scroll]);

    return (
      <div
        ref={ref}
        style={{
          ...style,
          height: scroll ? 'auto' : height ? `${height}px` : '100vh',
          overflowX: 'hidden',
          overflowY: scroll ? 'auto' : 'hidden',
        }}
        {...other}
      >
        <div className='flex min-h-full w-full justify-center'>
          <div className='relative w-full max-w-xl'>{children}</div>
        </div>
      </div>
    );
  },
);

Container.displayName = 'Container';

export default Container;
