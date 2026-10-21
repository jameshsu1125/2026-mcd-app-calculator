import { toBlob, toPng } from 'html-to-image';
import { useCallback, useState } from 'react';

type TCaptureOptions = {
  /** 輸出倍率，預設 1（750 寬就輸出 750 寬） */
  pixelRatio?: number;
  /** 輸出寬度，預設為元素寬度 */
  width?: number;
  /** 輸出高度，預設為元素高度 */
  height?: number;
  /** 背景色，預設透明 */
  backgroundColor?: string;
};

type TDownloadOptions = TCaptureOptions & {
  /** 檔名，預設 result.png */
  fileName?: string;
};

// 這些屬性的 url() 都是偽元素常見的圖片來源，html-to-image 不會幫忙轉成 base64
const URL_PROPERTIES = ['background-image', 'mask-image'] as const;
const PSEUDOS = ['::before', '::after'] as const;
const ATTRIBUTE = 'data-capture-id';

// 同一個網址只下載一次
const dataUrlCache = new Map<string, Promise<string>>();

const fetchAsDataUrl = (url: string) => {
  const cached = dataUrlCache.get(url);
  if (cached) return cached;

  const task = fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        }),
    );
  // 失敗不要留在快取裡，下次可以重試
  task.catch(() => dataUrlCache.delete(url));
  dataUrlCache.set(url, task);
  return task;
};

/**
 * 把元素底下所有偽元素（::before / ::after）的 background-image、mask-image
 * 換成 base64，回傳還原用的 function。
 */
const inlinePseudoImages = async (root: HTMLElement) => {
  const rules: string[] = [];
  const marked: Element[] = [];

  for (const element of [root, ...Array.from(root.querySelectorAll('*'))]) {
    for (const pseudo of PSEUDOS) {
      const computed = getComputedStyle(element, pseudo);
      const declarations: string[] = [];

      for (const property of URL_PROPERTIES) {
        const value = computed.getPropertyValue(property);
        const urls = Array.from(value.matchAll(/url\(["']?([^"')]+)["']?\)/g))
          .map((match) => match[1])
          .filter((url) => !url.startsWith('data:'));
        if (!urls.length) continue;

        let inlined = value;
        for (const url of urls) inlined = inlined.split(url).join(await fetchAsDataUrl(url));
        declarations.push(`${property}:${inlined}!important`);
        // Safari 舊版只認 -webkit- 前綴
        if (property === 'mask-image') declarations.push(`-webkit-mask-image:${inlined}!important`);
      }

      if (!declarations.length) continue;
      if (!element.hasAttribute(ATTRIBUTE)) {
        element.setAttribute(ATTRIBUTE, String(marked.length));
        marked.push(element);
      }
      rules.push(
        `[${ATTRIBUTE}="${element.getAttribute(ATTRIBUTE)}"]${pseudo}{${declarations.join(';')}}`,
      );
    }
  }

  const style = document.createElement('style');
  style.textContent = rules.join('\n');
  document.head.appendChild(style);

  return () => {
    style.remove();
    marked.forEach((element) => element.removeAttribute(ATTRIBUTE));
  };
};

const prepare = async (element: HTMLElement, options: TCaptureOptions) => {
  await document.fonts.ready;
  const restore = await inlinePseudoImages(element);
  return {
    restore,
    config: {
      pixelRatio: options.pixelRatio ?? 1,
      width: options.width,
      height: options.height,
      backgroundColor: options.backgroundColor,
    },
  };
};

/** 把 DOM 轉成 PNG 的 data URL */
export const captureToDataUrl = async (element: HTMLElement, options: TCaptureOptions = {}) => {
  const { restore, config } = await prepare(element, options);
  try {
    return await toPng(element, config);
  } finally {
    restore();
  }
};

/** 把 DOM 轉成 PNG 的 Blob（可以拿去上傳或分享） */
export const captureToBlob = async (element: HTMLElement, options: TCaptureOptions = {}) => {
  const { restore, config } = await prepare(element, options);
  try {
    const blob = await toBlob(element, config);
    if (!blob) throw new Error('capture failed: empty blob');
    return blob;
  } finally {
    restore();
  }
};

const useCaptureImage = () => {
  const [loading, setLoading] = useState(false);

  const run = useCallback(async <T>(task: () => Promise<T>) => {
    setLoading(true);
    try {
      return await task();
    } finally {
      setLoading(false);
    }
  }, []);

  const toDataUrl = useCallback(
    (element: HTMLElement, options?: TCaptureOptions) =>
      run(() => captureToDataUrl(element, options)),
    [run],
  );

  const toBlobFile = useCallback(
    (element: HTMLElement, options?: TCaptureOptions) => run(() => captureToBlob(element, options)),
    [run],
  );

  const download = useCallback(
    (element: HTMLElement, { fileName = 'result.png', ...options }: TDownloadOptions = {}) =>
      run(async () => {
        const dataUrl = await captureToDataUrl(element, options);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }),
    [run],
  );

  return { loading, toDataUrl, toBlob: toBlobFile, download };
};

export default useCaptureImage;
