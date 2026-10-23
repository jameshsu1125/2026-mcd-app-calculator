import Badge from '@/components/badge';
import useResult from '@/hooks/useResult';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useCallback, useContext, useMemo } from 'react';
import { MIN_INPUT_LENGTH } from '../../calculator/config';
import './index.less';

const ItemList = memo(() => {
  const [{ userResult }, setContext] = useContext(Context);
  const view = useResult();

  const { selected, extras } = useMemo(() => {
    if (!view) return { selected: [], extras: [] };
    const { selected, extras } = view;
    return { selected, extras };
  }, [view]);

  const onClick = useCallback(
    (item: { id: string; name: string; className: string }) => {
      const removeItem = userResult?.input.filter((i) => i.dataset.id !== item.id);
      if (removeItem) {
        if (removeItem?.length >= MIN_INPUT_LENGTH) {
          setContext({ type: ActionType.UserResult, state: { input: removeItem } });
        }
      }
    },
    [userResult],
  );

  return (
    <div className='ItemList'>
      <div className='flex w-full flex-col items-center justify-center gap-3 px-5 pt-6 pb-10 lg:px-0'>
        <div className='flex w-full max-w-lg flex-col justify-start gap-2'>
          <div className='h0' />
          <div className='flex w-full flex-row flex-wrap items-start justify-start gap-3'>
            {selected.map((item) => (
              <Badge
                key={item.id}
                size='large'
                canClose={(userResult?.input?.length ?? 0) > MIN_INPUT_LENGTH}
                onClick={() => onClick(item)}
              >
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
