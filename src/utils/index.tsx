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

export function shareURL({ onError }: { onError?: () => void }) {
  if (navigator.share) {
    const shareData = {
      title: '快來挑戰看看！',
      text: '快來挑戰看看！\n你能打敗我嗎？',
      url: window.location.href,
    };
    navigator
      .share(shareData)
      .then(() => console.log('URL shared successfully'))
      .catch((error) => console.error('Error sharing URL:', error));
  } else {
    onError?.();
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
