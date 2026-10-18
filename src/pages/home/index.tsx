import { memo, useMemo, useState } from 'react';
import { HomeContext, THomeState, HomeState } from './config';
import './index.less';
import Intro from './intro';
import Calculator from './calculator';

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
        return <div>Result Page</div>;
    }
  }, [state.page]);

  return (
    <div className='Home'>
      <HomeContext.Provider value={[state, setState]}>{page}</HomeContext.Provider>
    </div>
  );
});

export default Home;
