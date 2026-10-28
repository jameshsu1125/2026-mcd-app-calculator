import { memo } from 'react';
import './index.less';
import Stat from './stat';
import Tickets from './tickets';

const Strategy = memo(() => (
  <div className='Strategy'>
    <div className='flex w-full justify-center px-[5%] pt-[5%] lg:px-0'>
      <div className='flex w-full max-w-lg flex-col items-start justify-start gap-5'>
        <div className='h0' />
        <Stat />
        <Tickets />
      </div>
    </div>
  </div>
));
export default Strategy;
