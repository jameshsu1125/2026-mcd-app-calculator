import { useState, useEffect } from 'react';
import './index.less';

export type TProps = {
  content: string;
  size?: Number | string;
};

const Qrcode = ({ content, size }: TProps) => {
  const [qrcode, setQrcode] = useState<string>('');

  useEffect(() => {
    const c = encodeURIComponent(content);
    setQrcode(`https://quickchart.io/qr?text=${c}&size=${size}`);
  }, [size, content]);

  return (
    <div
      className='Qrcode'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#fff',
        backgroundImage: `url(${qrcode})`,
      }}
    >
      <div />
    </div>
  );
};

export default Qrcode;
