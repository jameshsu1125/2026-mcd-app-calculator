import { MCD_GET_HIDDEN_DISCOUNT_URL } from '@/settings/config';
import copy from 'copy-to-clipboard';
import { memo, useEffect } from 'react';
import Button from '../button';
import './index.less';
import { trackCustomEvent, trackPageView } from '@/utils';

const HIDDEN_DISCOUNT_AVAILABLE_AT = new Date('2026-11-17T23:59:59+08:00').getTime();

export const isHiddenDiscountAvailable = () => Date.now() > HIDDEN_DISCOUNT_AVAILABLE_AT;

const HiddenDiscount = memo(() => {
  useEffect(() => {
    trackPageView('/hidden-discount', '隱藏折扣頁');
  }, []);
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
          <Button
            onClick={() => {
              copy('this is fake code').then(() => {
                alert('已複製到剪貼簿');
                trackCustomEvent('複製到剪貼簿按鍵');
              });
            }}
          >
            <Button.Copy />
          </Button>
        </div>
      </div>
      <div className='flex w-full justify-center py-[14%]'>
        <Button
          className='w-7/12'
          onClick={() => {
            trackCustomEvent('前往APP領取按鍵');
            setTimeout(() => {
              window.open(MCD_GET_HIDDEN_DISCOUNT_URL, '_blank');
            }, 300);
          }}
        >
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
