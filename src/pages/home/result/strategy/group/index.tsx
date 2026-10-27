import Button from '@/components/button';
import useCaptureImage from '@/hooks/useCaptureImage';
import { MCD_APP_URL } from '@/settings/config';
import { shareURL, shareWithoutImage } from '@/utils';
import { memo, useContext, useEffect } from 'react';
import { ResultContext } from '../../config';
import './index.less';
import { ActionType, ShareResultType } from '@/settings/type';
import { Context } from '@/settings/constant';

const Group = memo(() => {
  const [, setContext] = useContext(Context);
  const [{ target }] = useContext(ResultContext);
  const { loading, toBlob } = useCaptureImage();

  const onEnd = (type: ShareResultType) => {
    let body: string = '';
    switch (type) {
      case 'userCancel':
        body = '使用者取消分享，請重新嘗試。';
        break;

      case 'error':
        body = '瀏覽器不支援或是發生錯誤，請查明後再試。';
        break;

      default:
      case 'success':
        body = '分享成功！';
    }

    setContext({ type: ActionType.Modal, state: { enabled: true, body } });
  };

  return (
    <div className='Group'>
      <div className='flex w-full flex-col gap-8'>
        <Button className='w-full' onClick={() => window.open(MCD_APP_URL, '_blank')}>
          <Button.Regular>
            <div className='open-app' />
          </Button.Regular>
        </Button>
        <Button
          className='w-full'
          disabled={loading}
          onClick={() => {
            if (target) {
              toBlob(target, { backgroundColor: '#ffbc0d' }).then((blob) => {
                if (!blob) shareWithoutImage({ onEnd });
                else shareURL({ blob, onEnd });
              });
            }
          }}
        >
          <Button.Regular>
            <div className='download' />
          </Button.Regular>
        </Button>
        <Button className='w-full'>
          <Button.Regular>
            <div className='play-again' />
          </Button.Regular>
        </Button>
      </div>
    </div>
  );
});
export default Group;
