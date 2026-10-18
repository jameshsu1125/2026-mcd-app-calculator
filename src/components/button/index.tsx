import { IReactProps } from '@/settings/type';
import Regular from './regular';
import Info from './info';
import { twMerge } from 'tailwind-merge';
import Keyboard from './keyboard';

type TRegularProps = IReactProps & {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button = ({ id, children, className, style, onClick }: TRegularProps) => {
  return (
    <button
      id={id}
      className={twMerge('cursor-pointer bg-transparent', className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.regular = Regular;
Button.Info = Info;
Button.Keyboard = Keyboard;

export default Button;
