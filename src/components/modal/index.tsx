import { memo, useContext, useEffect } from 'react';
import './index.less';
import { Context } from '@/settings/constant';

const Modal = memo(() => {
  const [{ modal }] = useContext(Context);

  return (
    <div className='Modal'>
      <div className='bg' />
      <div className='inner'>
        <div className='dialog'>
          <span>{modal?.body}</span>
        </div>
      </div>
    </div>
  );
});
export default Modal;
