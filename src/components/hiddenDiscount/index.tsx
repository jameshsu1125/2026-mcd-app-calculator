import { memo, useEffect } from 'react';
import './index.less';
import Button from '../button';

const HiddenDiscount = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='HiddenDiscount'>
      <div className='headline'>
        <div />
      </div>
      <div className='text-0' />
      <div className='text-1'>
        <div />
      </div>
      <div className='text-2' />
      <div className='input'>
        <div>
          <span>APP週年慶有驚喜</span>
          <Button>
            <Button.Copy />
          </Button>
        </div>
      </div>
      <div className='flex w-full justify-center py-[14%]'>
        <Button className='w-7/12'>
          <Button.Active>前往APP領取</Button.Active>
        </Button>
      </div>
      <div className='w-full text-center text-xs font-black text-[#535353]'>
        每個麥當勞APP帳號限領一次
        <br />
        數量有限，領完為止
      </div>
    </div>
  );
});
export default HiddenDiscount;
