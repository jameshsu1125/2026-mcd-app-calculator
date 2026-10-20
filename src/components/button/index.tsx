import { IReactProps } from '@/settings/type';
import { twMerge } from 'tailwind-merge';
import Close from './close';
import Info from './info';
import Keyboard from './keyboard';
import Regular from './regular';
import Skip from './skip';

type TRegularProps = IReactProps & {
  id?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  dataset?: string;
};

const Button = ({ id, children, className, style, onClick, dataset, disabled }: TRegularProps) => {
  return (
    <button
      id={id}
      className={twMerge('cursor-pointer bg-transparent', className)}
      disabled={disabled}
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
Button.Close = Close;

export default Button;
