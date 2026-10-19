import { IReactProps } from '@/settings/type';
import Regular from './regular';
import Info from './info';
import { twMerge } from 'tailwind-merge';
import Keyboard from './keyboard';
import Skip from './skip';

type TRegularProps = IReactProps & {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  dataset?: string;
};

const Button = ({ id, children, className, style, onClick, dataset }: TRegularProps) => {
  return (
    <button
      id={id}
      className={twMerge('cursor-pointer bg-transparent', className)}
      style={style}
      onClick={onClick}
      data-dataset={dataset}
    >
      {children}
    </button>
  );
};

Button.regular = Regular;
Button.Info = Info;
Button.Keyboard = Keyboard;
Button.Skip = Skip;

export default Button;
