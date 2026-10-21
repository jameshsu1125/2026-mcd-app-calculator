import TweenerDivProvider from '@/components/tweenerProvider';
import { Bezier } from 'lesca-use-tween';
import { memo } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';

type LogoProps = {
  shouldFadeIn: boolean;
  className?: string;
  shouldShadow?: boolean;
};

const Logo = memo(({ shouldFadeIn, className, shouldShadow }: LogoProps) => {
  return (
    <TweenerDivProvider
      className={twMerge('Logo', shouldShadow && 'Logo-shadow', className)}
      initialStyle={{ opacity: 0, scaleX: 0.5, scaleY: 2, y: 100 }}
      tweenTo={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0 }}
      shouldFadeIn={shouldFadeIn}
      options={{ duration: 300, easing: Bezier.outBack }}
    />
  );
});
export default Logo;
