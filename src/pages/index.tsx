import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import Modal from '@/components/modal';
import useSoundsOnFirstTouch from '@/hooks/useSoundsOnFirstTouch';
import { PAGE } from '@/settings/config';
import { Context, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import QueryString from 'lesca-url-parameters';
import UserAgent, { UserAgentType } from 'lesca-user-agent';
import { Suspense, lazy, memo, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import ReactDOM from 'react-dom/client';

const Desktop = lazy(() => import('./desktop'));

Click.install();

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.JSON,
  formatType: formatType.JSON,
});

if (import.meta.env.VITE_MOCKING === 'true') {
  import('@/mocks/browser').then((e) => {
    e.worker.start({ serviceWorker: { url: './mockServiceWorker.js' } });
  });
}

const Pages = memo(() => {
  const [context] = useContext(Context);
  const page = context[ActionType.Page];

  const Page = useMemo(() => {
    const [target] = Object.values(PAGE).filter((data) => data === page);
    if (target) {
      const Element = lazy(() => import(`./${target}/index.tsx`));
      return (
        <Suspense fallback=''>
          <Element />
        </Suspense>
      );
    }
    return null;
  }, [page]);

  return Page;
});

const App = () => {
  const [state, setState] = useReducer(Reducer, InitialState);
  const value: TContext = useMemo(() => [state, setState], [state]);
  useSoundsOnFirstTouch(setState);

  const [device, setDevice] = useState(UserAgent.get());

  useEffect(() => {
    const resize = () => {
      if (QueryString.get('m') === '1') {
        setDevice(UserAgentType.Mobile);
        return;
      }
      setDevice(UserAgent.get());
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        {device === UserAgentType.Mobile ? (
          <Container scroll={state[ActionType.Scroll]?.enabled}>
            <Pages />
          </Container>
        ) : (
          <Suspense fallback=''>
            <Desktop />
          </Suspense>
        )}
        {state[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
        {state[ActionType.Modal]?.enabled && <Modal />}
      </Context.Provider>
    </div>
  );
};

if (document.getElementById('app')?.children.length === 0) {
  ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
}
