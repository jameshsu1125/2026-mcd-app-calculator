import { memo, useEffect, useMemo } from 'react';
import { DealType } from '@/settings/type';
import './index.less';
import { twMerge } from 'tailwind-merge';

const Ticket = ({ number, type }: { number: number; type: DealType }) => {
  const color = useMemo(() => {
    switch (type) {
      default:
      case 'full meal':
        return '#ffd9b3';
      case 'swear heart':
        return '#ffb4b4';
      case 'star 1 + 1':
        return '#b1b1b1';
    }
  }, [type]);

  const logoClass = useMemo(() => {
    switch (type) {
      default:
      case 'full meal':
        return 'logo-full-meal';
      case 'swear heart':
        return 'logo-swear-heart';
      case 'star 1 + 1':
        return 'logo-star-1-1';
    }
  }, [type]);

  const symbolClass = useMemo(() => {
    switch (type) {
      default:
      case 'full meal':
      case 'swear heart':
        return 'symbol-give';

      case 'star 1 + 1':
        return 'symbol-plus';
    }
  }, [type]);

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
      <div className='right'>
        <div className={twMerge('bg', logoClass)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlSpace='preserve'
            width='107.6'
            height='44.8'
            style={{ overflow: 'visible' }}
            viewBox='0 0 107.6 44.8'
            className='h-full w-full'
          >
            <path
              d='M104.1 0H2.1c0 1.2-.9 2.2-2.1 2.3v40.3c1.1.1 2 1 2.1 2.2h102c2 0 3.5-1.6 3.5-3.5V3.5c0-1.9-1.5-3.5-3.5-3.5'
              style={{ fill: color }}
            />
          </svg>
        </div>
        <div className='inner'>
          <div className='name-a'>買超值全餐</div>
          <div className='picture-a' />
          <div className='symbol'>
            <div className={symbolClass} />
          </div>
          <div className='name-b'>中薯</div>
          <div className='picture-b' />
        </div>
      </div>
      <div className='line'>
        <div></div>
      </div>
    </div>
  );
};

const Tickets = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Tickets'>
      <Ticket number={1} type='full meal' />
      <Ticket number={2} type='swear heart' />
      <Ticket number={3} type='star 1 + 1' />
    </div>
  );
});
export default Tickets;
