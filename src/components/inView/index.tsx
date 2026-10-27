import { memo, useEffect, useRef, type HTMLAttributes } from 'react';

type InViewProps = HTMLAttributes<HTMLDivElement> & {
  /** 看到多少百分比（0 ~ 100）時觸發，預設 50 */
  threshold?: number;
  /** true（預設）：只觸發第一次；false：每次重新進入畫面都觸發 */
  once?: boolean;
  /** 內容 scroll 到畫面中且達到 threshold 時觸發 */
  onEnter?: () => void;
};

// 內容比畫面高時，自身可見比例永遠到不了 threshold，所以也接受「可見高度佔畫面高度」達標
const STEPS = Array.from({ length: 101 }, (_, i) => i / 100);

/** 捲動到內容時觸發事件的容器，root 即為帶有 className 的 div（不額外多一層 DOM） */
const InView = memo(({ threshold = 50, once = true, onEnter, children, ...other }: InViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const target = Math.min(Math.max(threshold, 0), 100) / 100;
    let inside = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
        const reached =
          entry.isIntersecting &&
          (entry.intersectionRatio >= target ||
            entry.intersectionRect.height >= viewportHeight * target);

        if (reached && !inside) {
          inside = true;
          onEnterRef.current?.();
          if (once) observer.disconnect();
        } else if (!reached && !entry.isIntersecting) {
          // 完全離開畫面後才重置，once = false 時下次進入可再次觸發
          inside = false;
        }
      },
      { threshold: STEPS },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div ref={ref} {...other}>
      {children}
    </div>
  );
});

InView.displayName = 'InView';

export default InView;
