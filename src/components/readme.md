# Components

## Table of components

- [Components](#components)
  - [Table of components](#table-of-components)
    - [LoadingProcess](#loadingprocess)
      - [Usage](#usage)
      - [Props](#props)
    - [Container](#container)
      - [Usage](#usage-1)
      - [Props](#props-1)
      - [use100vh](#use100vh)
    - [InView](#inview)
      - [Usage](#usage-2)
      - [Props](#props-2)
    - [Development](#development)
      - [Methods](#methods)
      - [Properties](#properties)
      - [Props](#props-3)

### LoadingProcess

讀取畫面或是處理中畫面

#### Usage

```JSX
import { ActionType, LoadingProcessType, LoadingProcessVersion } from '@/settings/type';
import { Context} from '@/settings/constant';

const Pages = () => {
  const [, setContext] = useContext(Context);
  return (
    <button
      onClick={() => {
        setContext({ 
          type: ActionType.LoadingProcess, 
          state: {
            enabled: true,
            version: LoadingProcessVersion.Legacy,
            type: LoadingProcessType.BounceSmooth,
          }
        });
      }}
    >
      Submit
    </button>
  );
};
```

#### Props

| Properties            |         description         |  default |
| :-------------------- | :-------------------------: | -------: |
| **enabled**:_boolean_ |        append to DOM        |    false |
| **version**:_string_  |       loading design        |   'mcd' |
| **type**:_string_     | legacy loading icon style   | 'bounceSmooth' |
| **body**:_string_     | description text under icon | 'LOADING' |

Set `version` to `LoadingProcessVersion.Legacy` to use the previous CSS-mask loading design.
The default `LoadingProcessVersion.Mcd` uses the McDonald's animation.

### Container

高度等於「真實可視高度」的 `div`，解決手機瀏覽器（iOS Safari 等）`100vh` 被網址列、工具列蓋住的問題。
移植自 [react-div-100vh](https://github.com/mvasin/react-div-100vh)（MIT）。

原理：以 `window.innerHeight` 取得高度並監聽 `resize`；SSR 或尚未量測時退回 `100vh`。

#### Usage

```JSX
import Container, { use100vh } from '@/components/container';

const Pages = () => (
  <Container className='flex w-full flex-col'>
    <div className='flex-1'>content</div>
    <button>固定在畫面底部，不會被網址列遮住</button>
  </Container>
);
```

#### Props

繼承 `HTMLAttributes<HTMLDivElement>`，支援 `ref`。

| Properties          |             description             | default |
| :------------------ | :---------------------------------: | ------: |
| **scroll**:_boolean_ | 內容超出高度時是否可垂直捲動 |   false |
| **style**:_object_  | 會被合併，但 `height` 一律被覆蓋 |      {} |
| **...rest**:_props_ |      其餘屬性直接傳給 `div`      |       - |

> 在開發模式下，若傳入 `style.height` 會在 console 警告一次。

#### use100vh

需要真實高度的數值時（例如取一半高度）可直接使用 hook：

```JSX
import { use100vh } from '@/components/container';

const Half = ({ children }) => {
  const height = use100vh(); // number | null（SSR 為 null）
  return <div style={{ height: height ? height / 2 : '50vh' }}>{children}</div>;
};
```

| export                          |              description              |        return |
| :------------------------------ | :-----------------------------------: | ------------: |
| **use100vh**()                  | 真實可視高度，resize 時自動更新 | number \| null |
| **measureHeight**()             | 單次量測，回傳 `window.innerHeight` | number \| null |

### InView

捲動到內容、且看到指定百分比時觸發事件。root 就是帶 `className` 的 `div`，不會多一層 DOM。

#### Usage

```JSX
import InView from '@/components/inView';

const Pages = () => (
  <InView className='Stat' threshold={50} onEnter={() => console.log('看到 50% 了')}>
    content
  </InView>
);
```

#### Props

繼承 `HTMLAttributes<HTMLDivElement>`。

| Properties              |                    description                    | default |
| :---------------------- | :-----------------------------------------------: | ------: |
| **threshold**:_number_  |        看到多少百分比（0 ~ 100）時觸發        |      50 |
| **once**:_boolean_      | true 只觸發一次；false 每次重新進入都觸發 |    true |
| **onEnter**:_function_  |                   觸發時呼叫                   |       - |

> 內容比畫面高時（例如很多張票券），可見比例到不了 threshold，所以「可見高度佔畫面高度達 threshold」也視為達標。

### Development

#### Methods

| method                              | description | return |
| :---------------------------------- | :---------: | -----: |
| .**functionName**(**arg**:_string_) |     xxx     |   void |

#### Properties

| Properties            | description | default |
| :-------------------- | :---------: | ------: |
| .**enable**:_boolean_ |     xxx     |    true |

#### Props

| Properties         | description | default |
| :----------------- | :---------: | ------: |
| **title**:_string_ |     xxx     |      '' |
