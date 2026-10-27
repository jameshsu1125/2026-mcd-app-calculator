import { memo, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

const ARCHES =
  'm195.8 17.933c23.3 0 42.2 98.3 42.2 219.7h34c0-130.7-34.3-236.5-76.3-236.5-24 0-45.2 31.7-59.2 81.5-14-49.8-35.2-81.5-59-81.5-42 0-76.2 105.7-76.2 236.4h34c0-121.4 18.7-219.6 42-219.6s42.2 90.8 42.2 202.8h33.8c0-112 19-202.8 42.3-202.8';

const VIEW_BOX = { x: 400, y: 120, width: 400, height: 480 };
// 沒有底部文字時裁掉多餘的留白,讓外部的文字貼近圖示
const VIEW_BOX_HEIGHT_NO_TEXT = 420;

type McdLoadingProps = {
  /** 寬度(px),高度依比例自動計算 */
  size?: number;
  /** 是否顯示底部的 LOADING 文字與跳動圓點 */
  showText?: boolean;
  /** 底部文字內容 */
  label?: string;
  /** 文字旁邊的跳動圓點,位置固定在預設的 LOADING 之後 */
  showDots?: boolean;
  className?: string;
};

const McdLoading = memo(
  ({
    size = 240,
    showText = true,
    label = 'LOADING',
    showDots = true,
    className,
  }: McdLoadingProps) => {
    // 同一頁可能有多個實例,gradient / filter / clipPath 的 id 不能重複
    const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
    const id = (name: string) => `${uid}-${name}`;
    const ref = (name: string) => `url(#${id(name)})`;
    const viewHeight = showText ? VIEW_BOX.height : VIEW_BOX_HEIGHT_NO_TEXT;

    return (
      <svg
        className={twMerge('McdLoading', className)}
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${viewHeight}`}
        width={size}
        height={(size * viewHeight) / VIEW_BOX.width}
        role='img'
        aria-label='Loading'
      >
        <defs>
          <radialGradient id={id('bgGlow')} cx='50%' cy='47%' r='48%'>
            <stop offset='0%' stopColor='#FF9600' stopOpacity='0.22' />
            <stop offset='45%' stopColor='#DD1021' stopOpacity='0.08' />
            <stop offset='100%' stopColor='#080502' stopOpacity='0' />
          </radialGradient>

          <radialGradient id={id('centerHalo')} cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='#FFE043' stopOpacity='0.6' />
            <stop offset='50%' stopColor='#FF9500' stopOpacity='0.2' />
            <stop offset='100%' stopColor='#FF9500' stopOpacity='0' />
          </radialGradient>

          <linearGradient id={id('goldArchGrad')} x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#FFF37A' />
            <stop offset='28%' stopColor='#FFCC00' />
            <stop offset='85%' stopColor='#F7A100' />
            <stop offset='100%' stopColor='#DE7900' />
          </linearGradient>

          <radialGradient id={id('spinnerSweep')} cx='50%' cy='50%' r='50%'>
            <stop offset='70%' stopColor='#FFF' stopOpacity='1' />
            <stop offset='100%' stopColor='#FFF' stopOpacity='0' />
          </radialGradient>

          <clipPath id={id('archClip')}>
            <path d={ARCHES} />
          </clipPath>

          <filter id={id('softGlow')} x='-30%' y='-30%' width='160%' height='160%'>
            <feGaussianBlur stdDeviation='8' result='blur' />
            <feColorMatrix
              type='matrix'
              values='1 0 0 0 1   0 0.8 0 0 0.6   0 0 0 0 0.1  0 0 0 0.8 0'
              result='coloredBlur'
            />
            <feMerge>
              <feMergeNode in='coloredBlur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>

          <filter id={id('dropShadow')} x='-20%' y='-20%' width='140%' height='140%'>
            <feDropShadow
              dx='0'
              dy='6'
              stdDeviation='10'
              floodColor='#803500'
              floodOpacity='0.45'
            />
          </filter>

          <g id={id('sparkle')}>
            <path d='M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z' fill='#FFEAA0' />
            <circle cx='0' cy='0' r='3' fill='#FFFFFF' />
          </g>

          <g id={id('fry')}>
            <rect
              x='-3'
              y='-10'
              width='6'
              height='20'
              rx='3'
              fill='#FFC700'
              stroke='#FFE977'
              strokeWidth='1'
            />
            <rect x='-1.5' y='-8' width='3' height='4' rx='1.5' fill='#FFF8CE' opacity='0.8' />
          </g>
        </defs>

        {/* 背景光暈與地板陰影 */}
        <rect x='0' y='0' width='1200' height='700' fill={ref('bgGlow')} />
        <ellipse cx='600' cy='500' rx='160' ry='18' fill='#000000' opacity='0.4' />
        <ellipse cx='600' cy='500' rx='90' ry='10' fill='#000000' opacity='0.3' />

        <g>
          <circle className='mcd-halo-pulse' cx='600' cy='320' r='175' fill={ref('centerHalo')} />

          {/* 外圈:細導引線 + 順時針旋轉的虛線環(含星星與薯條) */}
          <circle
            cx='600'
            cy='320'
            r='185'
            fill='none'
            stroke='#FFCC00'
            strokeWidth='1.5'
            strokeOpacity='0.18'
          />
          <g className='mcd-orbit-cw'>
            <circle
              cx='600'
              cy='320'
              r='185'
              fill='none'
              stroke='#FFE144'
              strokeWidth='3'
              strokeLinecap='round'
              strokeDasharray='14 28 42 28 70 35'
              strokeOpacity='0.8'
            />
            <g transform='translate(600, 135)'>
              <use href={`#${id('sparkle')}`} className='mcd-twinkle-1' />
            </g>
            <g transform='translate(785, 320) rotate(90)'>
              <use href={`#${id('fry')}`} />
            </g>
            <g transform='translate(600, 505)'>
              <use href={`#${id('sparkle')}`} className='mcd-twinkle-2' />
            </g>
            <g transform='translate(415, 320) rotate(-90)'>
              <use href={`#${id('fry')}`} />
            </g>
          </g>

          {/* 中圈:逆時針旋轉的點狀環 */}
          <g className='mcd-orbit-ccw'>
            <circle
              cx='600'
              cy='320'
              r='150'
              fill='none'
              stroke='#FFE76A'
              strokeWidth='3.5'
              strokeLinecap='round'
              strokeDasharray='2 22'
              strokeOpacity='0.65'
            />
            <circle cx='706' cy='214' r='4.5' fill='#FFE247' filter={ref('softGlow')} />
            <circle cx='494' cy='426' r='4.5' fill='#FF9A00' filter={ref('softGlow')} />
            <circle cx='494' cy='214' r='3' fill='#FFFFFF' />
            <circle cx='706' cy='426' r='3' fill='#FFE247' />
          </g>

          {/* 內圈:快速旋轉的進度弧 */}
          <g className='mcd-orbit-cw-fast'>
            <circle
              cx='600'
              cy='320'
              r='125'
              fill='none'
              stroke='#FFC000'
              strokeWidth='3'
              strokeLinecap='round'
              strokeDasharray='60 200'
              strokeOpacity='0.9'
            />
            <circle cx='600' cy='195' r='4.5' fill='#FFF59D' filter={ref('softGlow')} />
          </g>
          <circle
            cx='600'
            cy='320'
            r='125'
            fill='none'
            stroke='#FFA200'
            strokeWidth='1.2'
            strokeDasharray='3 6'
            strokeOpacity='0.25'
          />

          {/* 中央圓盤 + 金拱門 */}
          <g className='mcd-icon-float'>
            <g transform='translate(600 320) scale(0.85) translate(-600 -320)'>
              <circle cx='600' cy='320' r='98' fill='#ffbc0d' filter={ref('dropShadow')} />
              <circle
                cx='600'
                cy='320'
                r='98'
                fill='none'
                stroke='#FFAE00'
                strokeWidth='3.5'
                strokeOpacity='0.45'
              />
              <circle
                cx='600'
                cy='320'
                r='92'
                fill='none'
                stroke='#FFFFFF'
                strokeWidth='1.2'
                strokeDasharray='4 6'
                strokeOpacity='0.35'
              />

              <g opacity='0.15'>
                <line
                  x1='600'
                  y1='228'
                  x2='600'
                  y2='246'
                  stroke='#FFF'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <line
                  x1='600'
                  y1='394'
                  x2='600'
                  y2='412'
                  stroke='#FFF'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <line
                  x1='508'
                  y1='320'
                  x2='526'
                  y2='320'
                  stroke='#FFF'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <line
                  x1='674'
                  y1='320'
                  x2='692'
                  y2='320'
                  stroke='#FFF'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </g>

              <g transform='translate(520.9, 250.8) scale(0.58)'>
                <path d={ARCHES} fill='#800C00' transform='translate(0, 5)' opacity='0.45' />
                <g filter={ref('softGlow')}>
                  <path d={ARCHES} fill={ref('goldArchGrad')} />
                </g>
                <g clipPath={ref('archClip')}>
                  <rect
                    className='mcd-shimmer'
                    x='0'
                    y='0'
                    width='60'
                    height='250'
                    fill={ref('spinnerSweep')}
                    fillOpacity='0.75'
                  />
                </g>
                <path
                  d={ARCHES}
                  fill='none'
                  stroke='#FFF59D'
                  strokeWidth='2.5'
                  strokeOpacity='0.8'
                  strokeLinejoin='round'
                />
              </g>
            </g>
          </g>

          {/* 四角閃光 */}
          <g transform='translate(425, 215) scale(0.8)'>
            <use href={`#${id('sparkle')}`} className='mcd-twinkle-1' />
          </g>
          <g transform='translate(775, 225) scale(0.95)'>
            <use href={`#${id('sparkle')}`} className='mcd-twinkle-2' />
          </g>
          <g transform='translate(405, 415) scale(0.85)'>
            <use href={`#${id('sparkle')}`} className='mcd-twinkle-3' />
          </g>
          <g transform='translate(790, 410) scale(0.75)'>
            <use href={`#${id('sparkle')}`} className='mcd-twinkle-1' />
          </g>
        </g>

        {showText && (
          <g transform='translate(600, 560)'>
            <text
              x='0'
              y='0'
              textAnchor='middle'
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif"
              fontSize='14'
              fontWeight='800'
              letterSpacing='6'
              fill='#FFD23F'
              opacity='0.95'
            >
              {label}
            </text>
            {showDots && (
              <g transform='translate(62, -4)'>
                <circle className='mcd-dot-1' cx='0' cy='0' r='2.8' fill='#FFC72C' />
                <circle className='mcd-dot-2' cx='10' cy='0' r='2.8' fill='#FFC72C' />
                <circle className='mcd-dot-3' cx='20' cy='0' r='2.8' fill='#FFC72C' />
              </g>
            )}
          </g>
        )}
      </svg>
    );
  },
);
export default McdLoading;
