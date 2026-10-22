import Badge from '@/components/badge';
import useResult from '@/hooks/useResult';
import { memo, useMemo } from 'react';
import './index.less';

const ItemList = memo(() => {
  const view = useResult();

  const { selected, extras } = useMemo(() => {
    if (!view) return { selected: [], extras: [] };
    const { selected, extras } = view;
    return { selected, extras };
  }, [view]);

  return (
    <div className='ItemList'>
      <div className='flex w-full flex-col items-center justify-center gap-3 px-5 pt-6 pb-10 lg:px-0'>
        <div className='flex w-full max-w-lg flex-col justify-start gap-2'>
          <div className='h0' />
          <div className='flex w-full flex-row flex-wrap items-start justify-start gap-3'>
            {selected.map((item) => (
              <Badge key={item.id} size='large' canClose>
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className='mt-2 flex w-full max-w-lg flex-row flex-wrap items-center justify-start gap-2'>
          <div className='h1' />
          {extras.map((item) => (
            <Badge key={item.id} size='small'>
              {item.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
});
export default ItemList;
