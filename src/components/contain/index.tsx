import { memo, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

type ContainProps = {
  children?: React.ReactNode;
  className?: string;
  maxWidth?: string;
  paddingBlock?: string;
  allowScroll?: boolean;
};

/** 高度隨頁面縮放；內容超過頁面高度時鎖住最小高度並出現 Scroll */
const Contain = memo(
  ({ children, className, maxWidth, paddingBlock, allowScroll }: ContainProps) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const containRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(false);

    // 偵測 children 內容是否超過螢幕高度，超過才開啟 Scroll（容差 2px 避免小數點造成捲軸閃爍）
    useEffect(() => {
      const inner = innerRef.current;
      const contain = containRef.current;
      if (!inner || !contain) return undefined;

      const check = () => setOverflow(contain.scrollHeight - inner.clientHeight > 2);
      const observer = new ResizeObserver(check);
      observer.observe(inner);
      observer.observe(contain);
      check();

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={innerRef} className={twMerge('Contain inner', overflow && 'scrollable', className)}>
        <div
          ref={containRef}
          className={twMerge('contain', allowScroll && 'allow-scroll', maxWidth ?? 'max-w-md')}
          style={{ paddingBlock }}
        >
          {children}
        </div>
      </div>
    );
  },
);
Contain.displayName = 'Contain';

export default Contain;
