import { memo, useEffect } from 'react';
import './index.less';
import Stat from './stat';
import Tickets from './tickets';
import Group from './group';

const Strategy = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Strategy'>
      <div className='flex w-full justify-center px-5 py-5 lg:px-0'>
        <div className='flex w-full max-w-lg flex-col items-start justify-start gap-5'>
          <div className='h0' />
          <Stat />
          <Tickets />
          <Group />
        </div>
      </div>
    </div>
  );
});
export default Strategy;
