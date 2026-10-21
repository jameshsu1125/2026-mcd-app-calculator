import { memo, useMemo, useState } from 'react';
import Calculator from './calculator';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';
import Intro from './intro';
import Result from './result';
import Info from './info';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);

  const page = useMemo(() => {
    switch (state.page) {
      default:
      case 0:
        return <Intro />;
      case 1:
        return <Calculator />;
      case 2:
        return <Result />;
    }
  }, [state.page]);

  return (
    <div className='Home'>
      <HomeContext.Provider value={[state, setState]}>{page}</HomeContext.Provider>
      <Info />
    </div>
  );
});

export default Home;
