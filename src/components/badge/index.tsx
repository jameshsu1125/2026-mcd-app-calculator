import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../button';
import './index.less';

type BadgeProps = IReactProps & {
  size: 'small' | 'large';
  canClose?: boolean;
  onClose?: () => void;
};

const Badge = memo(({ children, size, canClose, onClose }: BadgeProps) => (
  <div className={twMerge(`Badge`, size === 'large' ? 'Badge-large' : 'Badge-small')}>
    {children}
    {canClose && (
      <Button onClick={onClose}>
        <Button.Close size='small' />
      </Button>
    )}
  </div>
));
export default Badge;
