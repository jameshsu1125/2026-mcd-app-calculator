[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![TS](https://img.shields.io/badge/Typescript-4277c0?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![LESS](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![TW](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=npm&logoColor=white)](https://lesscss.org/)
[![ROUTER](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=npm&logoColor=white)](https://lesscss.org/)

<p align="center">
  <a href="https://github.com/jameshsu1125">
    <img src="https://user-images.githubusercontent.com/70932507/188534539-a68734ac-9330-4fe0-bc49-5fa85116493e.png" alt="Logo" width=72 height=72>
  </a>
  <h3 align="center">Logo</h3>
  <p align="center">
    Short description   
  </p>
</p>

## Table of contents

- [Table of contents](#table-of-contents)
- [Quick start](#quick-start)
- [before deploy](#before-deploy)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [naming conventions rules](#naming-conventions-rules)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## Quick start

- install module

```sh
$ npm i
```

- create `.env` file

```sh
touch src/pages/.env
```

- copy variables to `.env` file.

```text
VITE_MOCKING=false
VITE_API_PATH='./api'

VITE_TITLE=title
VITE_SUBSCRIPTION=description
VITE_URL=https://jameshsu1125.github.io
VITE_FACEBOOK_ID=your-facebook-id
```

- start project

```sh
$ npm run dev
```

- build static file to `/dist`

```sh
$ npm run build
```

## before deploy

- deploy on `netlify`
  - create `Netlify` site

    ```sh
    netlify sites:create
    ```

  - or link `Netlify` site id

    ```sh
    netlify link
    ```

## Status

- Development since January 2023
- use [vite](https://vitejs.dev/) for development environment and bundler.
- use [React](https://react.dev/) for main javascript library.
- use [Typescript](https://www.typescriptlang.org/) for syntax.
- use [LessCSS](https://lesscss.org/) and [TailwindCSS](https://tailwindcss.com/) for css library.
- use [ESLint](https://eslint.org/) rules for coding style.
- use [Mocks](https://mswjs.io/) and [faker](https://fakerjs.dev/) for testing API

## What's included

- `public` folder will copy to `/dist`
- `src` folder is reactJs entry point. default file is named as `pages/index.tsx`

## Bugs and feature requests

- [Node](https://nodejs.org/en/) version must be above v18
- I will not maintain when this project is closed

## naming conventions rules

1. general variable - `Camel Case`
   > ex: _setState_、_currentTarget_、_pinkBackground_、_innerText_
2. react components and class name - `Pascal Case`.
   > ex: _RegularButton_、_NavigationBar_
3. global variable or state - `Pascal Case`.
   > ex: _Context_、_LandingState_
4. Immutable variable or environment variable - `Screaming Snake Case`.
   > ex: _PAGE_、<em>VITE_TITLE</em>
5. type - `I` = interface, `T` = type.
   > ex: _IProps_、_TResult_
6. enum options - `Pascal Case` + `"Type"`.
   > ex: _ActionType_、_AlertType_、_ModalType_
7. class name = `Snake Case`.
   > ex: _.button-group_、_.button-label_

[naming-conventions](https://medium.com/@code.ceeker/naming-conventions-camel-case-pascal-case-kebab-case-and-more-dc4e515b9652)

## Contributing

Please read through our [contributing guidelines](https://github.com/github/docs/blob/main/contributing/README.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML and CSS should conform to the [Code Guide](https://github.com/airbnb/javascript), maintained by [Main author](https://github.com/jameshsu1125).

## Creators

**maintainer, developer**

- [James Hsu](https://github.com/jameshsu1125)

## Thanks

Thank customers and some manufacturers for their support.

## 圖片與字型 CDN（Bunny）

圖片維持在各元件旁的 `img/` 資料夾與 `public/img/`，字型維持在 `src/settings/fonts/`，Less／CSS 原始碼不用改。
支援的檔案類型：圖片 svg、png、jpg、jpeg、gif、webp、avif、ico；字型 woff2、woff、ttf、otf；音檔 mp3、wav、ogg、m4a、aac。

- **TS／TSX 匯入的檔案**（例如音檔 `import bgm from './mp3/mp3-bgm.mp3'`）：`cdn` 模式由 `scripts/vite-cdn-assets.js` 換成 CDN 網址，`local` 模式照 Vite 原本打包。
- **音效**：設定在 `src/components/sounds/config.ts`。使用者第一次點擊畫面時才建立 `Sounds` 並讀取全部音檔（`src/hooks/useSoundsOnFirstTouch.ts`），存在 Context 的 `sounds`：`context[ActionType.Sounds]?.instance?.play('click')`，`loaded` 表示全部讀取完成。

- **開關**：在 `src/pages/.env.local` 設定 `VITE_IMAGE_SOURCE=local`（本機）或 `cdn`（Bunny），`VITE_CDN_URL=https://<zone>.b-cdn.net`，以及存放資料夾 `VITE_CDN_FOLDER=default`（必填，不能是根目錄）。
  `cdn` 模式下，建置時 `scripts/postcss-cdn-url.js` 會把 CSS 內所有圖片與字型的 `url()` 改成 CDN 網址（附 `?v=<hash>`），`index.html` 的 og:image 也一併改用 CDN。
- **一鍵發布**：`npm run cdn:upload`（只上傳有變動的；`npm run cdn:upload -- --force` 全部重傳）。
  需在 `.env.local` 設定 `BUNNY_STORAGE_ZONE`、`BUNNY_STORAGE_PASSWORD`、`BUNNY_SFTP_HOST`（依 zone 區域，例如 `sg.storage.bunnycdn.com`）。
- **CDN 路徑**：`src/components/button/img/x.svg` → `<CDN>/<VITE_CDN_FOLDER>/components/button/img/x.svg`；`public/img/a.jpg` → `<CDN>/<VITE_CDN_FOLDER>/img/a.jpg`。

## Copyright and license

Code and documentation copyright 2011-2022 the authors. Code released under the [MIT License](https://github.com/jameshsu1125/template-vite-react/blob/main/LICENSE).

<!-- open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security -->
