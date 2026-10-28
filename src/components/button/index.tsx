import { Context } from '@/settings/constant';
import { IReactProps } from '@/settings/type';
import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import Active from './active';
import Close from './close';
import Copy from './copy';
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
Button.Copy = Copy;
Button.Active = Active;

export default Button;
