import { memo, useEffect } from 'react';
import './index.less';
import Badge from '@/components/badge';

const ItemList = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='ItemList'>
      <div className='flex w-full flex-col items-center justify-center gap-3 py-5'>
        <div className='flex w-full max-w-lg flex-col justify-start gap-2'>
          <div className='h0' />
          <div className='flex w-full flex-row flex-wrap items-start justify-start gap-3'>
            <Badge size='large' canClose>
              麥克鷄塊
            </Badge>
            <Badge size='large' canClose>
              玉米湯
            </Badge>
            <Badge size='large' canClose>
              薯條
            </Badge>
            <Badge size='large' canClose>
              汽水
            </Badge>
          </div>
        </div>
        <div className='flex w-full max-w-lg flex-row items-center justify-start gap-2'>
          <div className='h1' />
          <Badge size='small'>麥香鷄</Badge>
          <Badge size='small'>中薯</Badge>
          <Badge size='small'>冰美式</Badge>
          <Badge size='small'>可口可樂 (中) </Badge>
        </div>
      </div>
    </div>
  );
});
export default ItemList;
