import { memo, useEffect } from 'react';
import './index.less';
import Button from '@/components/button';

const Group = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Group'>
      <div className='flex w-full flex-col gap-8'>
        <Button className='w-full'>
          <Button.Regular>
            <div className='open-app' />
          </Button.Regular>
        </Button>
        <Button className='w-full'>
          <Button.Regular>
            <div className='download' />
          </Button.Regular>
        </Button>
        <Button className='w-full'>
          <Button.Regular>
            <div className='play-again' />
          </Button.Regular>
        </Button>
      </div>
    </div>
  );
});
export default Group;
