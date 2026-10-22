import { memo, useEffect } from 'react';
import './index.less';

const Ticket = ({ number }: { number: number }) => {
  return (
    <div className='ticket'>
      <div className='left'>
        <div className='inner'>
          <div />
          <div>
            <div />
            <div>{number}</div>
          </div>
          <div />
        </div>
      </div>
      <div className='right'></div>
      <div className='line'>
        <div />
      </div>
    </div>
  );
};

const Tickets = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Tickets'>
      <Ticket number={1} />
      <Ticket number={2} />
      <Ticket number={3} />
    </div>
  );
});
export default Tickets;
