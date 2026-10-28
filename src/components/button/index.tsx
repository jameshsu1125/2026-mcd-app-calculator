import { IReactProps } from '@/settings/type';
import { twMerge } from 'tailwind-merge';
import Close from './close';
import Info from './info';
import Keyboard from './keyboard';
import Regular from './regular';
import Skip from './skip';
import { useContext } from 'react';
import { Context } from '@/settings/constant';

type TRegularProps = IReactProps & {
  id?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  dataset?: string;
};

const Button = ({ id, children, className, style, onClick, dataset, disabled }: TRegularProps) => {
  const [{ sounds }] = useContext(Context);
  return (
    <button
      id={id}
      className={twMerge('cursor-pointer bg-transparent', className)}
      disabled={disabled}
      style={style}
      onClick={() => {
        onClick?.();
        sounds?.instance?.play('click');
      }}
      data-dataset={dataset}
    >
      {children}
    </button>
  );
};

Button.Regular = Regular;
Button.Info = Info;
Button.Keyboard = Keyboard;
Button.Skip = Skip;
Button.Close = Close;

export default Button;
