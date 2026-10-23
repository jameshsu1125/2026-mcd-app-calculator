import useResult, { Coupons } from '@/hooks/useResult';
import { memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

type TicketProps = {
  number: number;
  type: string;
  data: Coupons[number];
};

const Ticket = ({ number, type, data }: TicketProps) => {
  const color = useMemo(() => {
    switch (type) {
      default:
      case '買套餐送贈品':
      case '買一送一':
        return '#ffd9b3';
      case '數位甜心卡':
        return '#ffb4b4';
      case '1+1 星級點':
        return '#b1b1b1';
    }
  }, [type]);

  const logoClass = useMemo(() => {
    switch (type) {
      default:
      case '買套餐送贈品':
        return 'logo-full-meal';
      case '數位甜心卡':
        return 'logo-swear-heart';
      case '1+1 星級點':
        return 'logo-star-1-1';
    }
  }, [type]);

  const symbolClass = useMemo(() => {
    switch (type) {
      default:
        return 'symbol-give';

      case '1+1 星級點':
        return 'symbol-plus';
    }
  }, [type]);

  const nameA = useMemo(() => {
    switch (type) {
      case '數位甜心卡':
        return (
          <>
            買{data.products[0].role}
            <br />
            {data.products[0].name}
          </>
        );
      case '1+1 星級點':
        return (
          <>
            買紅區
            <br />
            {data.products[0].name}
          </>
        );
      case '買一送一':
        return (
          <>
            {data.products[0].role}
            {data.products[0].name}
          </>
        );
      case '買套餐送贈品':
        return '買超值全餐';

      case '滿額送':
        return '';

      default:
    }
  }, [type, data]);

  const nameB = useMemo(() => {
    switch (type) {
      case '數位甜心卡':
        return (
          <>
            B區
            <br />
            {data.products[1].name}
          </>
        );
      case '1+1 星級點':
        return (
          <>
            買紅區
            <br />
          </>
        );
      case '買一送一':
        return data.products[1].name;
      case '買套餐送贈品':
        return data.products[1].name;

      case '滿額送':
        return '';

      default:
    }
  }, [type, data]);

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
          <div className='name-a'>{nameA}</div>
          <div className='picture-a' />
          <div className='symbol'>
            <div className={symbolClass} />
          </div>
          <div className='name-b'>{nameB}</div>
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
  const view = useResult();
  const coupons = view?.coupons ?? [];

  return (
    <div className='Tickets'>
      {coupons.map((coupon, index) => (
        <Ticket key={index} number={index + 1} type={coupon.type} data={coupon} />
      ))}
    </div>
  );
});
export default Tickets;
