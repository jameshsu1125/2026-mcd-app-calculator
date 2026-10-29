import { ShareResultType } from '@/settings/type';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

// Optional: Also define gtag if you use it outside the window context
declare const gtag: (...args: any[]) => void;
declare const fbq: (...args: any[]) => void;

const shareDataWithoutImage = {
  title: import.meta.env.VITE_TITLE,
  text: `快來試試，你是什麼類型的攻略達人？
https://mcdtw.com/6/10/181
麥當勞APP週年慶優惠送不停
攻略達人，快到麥當勞APP集合啦🫡`,
  url: `${window.location.origin}${window.location.pathname}`,
};

type ShareWithoutImageProps = {
  onEnd?: (type: ShareResultType) => void;
};

export const shareWithoutImage = ({ onEnd }: ShareWithoutImageProps) => {
  navigator
    .share(shareDataWithoutImage)
    .then(() => {
      onEnd?.('success');
    })
    .catch(() => {
      onEnd?.('error');
    })
    .finally(() => {});
};

export function shareURL({ onEnd, blob }: { onEnd?: (type: ShareResultType) => void; blob: Blob }) {
  if (navigator.share) {
    const file = new File([blob], 'WOW_PRIME.jpg', { type: 'image/jpeg' });
    const filesArray = [file];

    const shareData = {
      files: filesArray,
      ...shareDataWithoutImage,
    };

    navigator
      .share(shareData)
      .then(() => {
        // Image shared successfully
        onEnd?.('success');
      })
      .catch(() => {
        // User cancelled sharing
        onEnd?.('userCancel');
      });
  } else {
    onEnd?.('error');
  }
}

export const trackPageView = (url: string, title: string) => {
  gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, { send_page_view: false });
  gtag('event', 'page_view', { page_title: title, page_location: url });
};

export const trackCustomEvent = (eventName: string, eventParams?: Record<string, any>) => {
  gtag('event', eventName, { ...eventParams, send_to: import.meta.env.VITE_GOOGLE_ANALYTICS_ID });
};

export const trackFacebookEvent = (eventName: string, eventParams?: Record<string, any>) => {
  fbq('track', eventName, eventParams);
};
