import Button from '@/components/button';
import { memo, useContext, useMemo } from 'react';
import { CalculatorContext, Keyboards } from '../config';

const Keyboard = memo(() => {
  const [{ time }] = useContext(CalculatorContext);

  const keyboard = useMemo(
    () => (time === 'breakfast' ? Keyboards.breakfast : Keyboards.allDay),
    [time],
  );

  return (
    <div className='w-full shrink-0 px-5'>
      <div className='grid w-full grid-cols-4 gap-5'>
        {keyboard.map((data, index) => (
          <Button key={`keyboard-${data.className}-${index}`} className='relative w-full pb-[100%]'>
            <Button.Keyboard className={data.className} />
          </Button>
        ))}
      </div>
    </div>
  );
});
export default Keyboard;
