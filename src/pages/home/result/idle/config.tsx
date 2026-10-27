import { Bezier } from 'lesca-use-tween';

export const Effects = [
  [],
  [
    {
      initialStyle: { opacity: 0, scale: 0 },
      tweenTo: { opacity: 1, scale: 1 },
      options: { duration: 250, delay: 750, easing: Bezier.outBack },
      loopClass: 'animate-blank-5s',
    },
    {
      initialStyle: { opacity: 0, scale: 0 },
      tweenTo: { opacity: 1, scale: 1 },
      options: { duration: 250, delay: 950, easing: Bezier.outBack },
      loopClass: 'animate-blank-5s',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, scale: 2 },
      tweenTo: { opacity: 1, scale: 1 },
      options: { duration: 250, delay: 750, easing: Bezier.outBack },
      loopClass: 'animate-ping duration-1000',
    },
  ],
  [],
  [
    {
      initialStyle: { opacity: 0, scale: 2 },
      tweenTo: { opacity: 1, scale: 1 },
      options: { duration: 250, delay: 750, easing: Bezier.outBack },
      loopClass: 'animate-swing-r8',
    },
    {
      initialStyle: { opacity: 0, scale: 2 },
      tweenTo: { opacity: 1, scale: 1 },
      options: { duration: 250, delay: 850, easing: Bezier.outBack },
      loopClass: 'animate-swing-r8-reverse',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, scale: 2 },
      tweenTo: { opacity: 1, scale: 1 },
      options: { duration: 250, delay: 750, easing: Bezier.outBack },
      loopClass: '',
    },
  ],
];

export const Items = [
  [
    {
      initialStyle: { opacity: 0, y: 150, scale: 0 },
      tweenTo: { opacity: 1, y: 0, scale: 1 },
      options: { duration: 250, delay: 650, easing: Bezier.outBack },
      loopClass: 'animate-swing-r8',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, y: -300, scale: 0 },
      tweenTo: { opacity: 1, y: 0, scale: 1 },
      options: { duration: 250, delay: 650, easing: Bezier.outBack },
      loopClass: 'animate-swing-r8',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, y: -150 },
      tweenTo: { opacity: 1, y: 0 },
      options: { duration: 250, delay: 650, easing: Bezier.outBack },
      loopClass: 'animate-bounce-r20',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, y: -150 },
      tweenTo: { opacity: 1, y: 0 },
      options: { duration: 250, delay: 650 },
      loopClass: 'animate-shock',
    },
    {
      initialStyle: { opacity: 0, y: -150 },
      tweenTo: { opacity: 1, y: 0 },
      options: { duration: 250, delay: 700 },
      loopClass: 'animate-shock',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, y: -150 },
      tweenTo: { opacity: 1, y: 0 },
      options: { duration: 250, delay: 650, easing: Bezier.outBack },
      loopClass: 'animate-shock',
    },
  ],
  [
    {
      initialStyle: { opacity: 0, y: 150 },
      tweenTo: { opacity: 1, y: 0 },
      options: { duration: 250, delay: 650, easing: Bezier.outBack },
      loopClass: 'animate-swing-r8',
    },
  ],
];

export const Char = [
  {
    initialStyle: { opacity: 0, scale: 0 },
    tweenTo: { opacity: 1, scale: 1 },
    shouldFadeIn: true,
    options: { duration: 250, delay: 500, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 0 },
    tweenTo: { opacity: 1, scale: 1 },
    shouldFadeIn: true,
    options: { duration: 250, delay: 500, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 0 },
    tweenTo: { opacity: 1, scale: 1 },
    shouldFadeIn: true,
    options: { duration: 250, delay: 500, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 0 },
    tweenTo: { opacity: 1, scale: 1 },
    shouldFadeIn: true,
    options: { duration: 250, delay: 500, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 0 },
    tweenTo: { opacity: 1, scale: 1 },
    shouldFadeIn: true,
    options: { duration: 250, delay: 500, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 0 },
    tweenTo: { opacity: 1, scale: 1 },
    shouldFadeIn: true,
    options: { duration: 250, delay: 500, easing: Bezier.outBack },
  },
];
