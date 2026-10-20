import { createContext, Dispatch, SetStateAction } from 'react';

type TimePeriod = 'breakfast' | 'allDay';
export type InputType = (typeof Keyboards)['breakfast' | 'allDay'][number]['className'];
export enum InputOtherActionType {
  del = 'del',
  enter = 'enter',
  switch = 'switch',
  mcd = 'mcd',
  bird = 'bird',
  script = 'script',
  hungry = 'hungry',
}

export type InputInsertType = Exclude<InputType, keyof typeof InputOtherActionType>;

export enum CalculatorStepType {
  unset,
  fadeIn,
  keyboardDidFadeIn,
  infoDidFadeIn,
  instructionDidFadeIn,
  startCalculator,
}

export type TCalculatorState = {
  time: TimePeriod;
  step: CalculatorStepType;
  instructionState: { step: number; enabled: boolean };
  userInput: {
    className: (typeof Keyboards)['breakfast' | 'allDay'][number]['className'];
    dataset: { id: string; name: string };
  }[];
};
export type TCalculatorContext = [TCalculatorState, Dispatch<SetStateAction<TCalculatorState>>];

export const CalculatorState: TCalculatorState = {
  time: new Date().getHours() < 11 ? 'breakfast' : 'allDay',
  step: CalculatorStepType.unset,
  instructionState: { step: 0, enabled: false },
  userInput: [],
};

export const CalculatorContext = createContext<TCalculatorContext>([CalculatorState, () => {}]);

export const MAX_INPUT_LENGTH = 6;
export const MIN_INPUT_LENGTH = 2;

export const Keyboards = {
  breakfast: [
    {
      name: '刪除',
      id: 'del',
      className: 'del',
    },
    {
      name: 'Jingle 音效',
      id: 'mcd',
      className: 'mcd',
    },
    {
      name: '早晨鳥叫聲',
      id: 'bird',
      className: 'bird',
    },
    {
      name: '口播稿',
      id: 'script',
      className: 'script',
    },
    {
      name: '滿福堡系列',
      id: 'muffin',
      className: 'mcb',
    },
    {
      name: '鬆餅系列',
      id: 'pancake',
      className: 'mpf',
    },
    {
      name: '焙果系列',
      id: 'bagel',
      className: 'mbg',
    },
    {
      name: '蛋堡系列',
      id: 'egg_burger',
      className: 'meb',
    },
    {
      name: '麥克鷄塊',
      id: 'nuggets',
      className: 'mcn',
    },
    {
      name: '麥香鷄',
      id: 'mcchicken',
      className: 'mcc',
    },
    {
      name: '麥香魚',
      id: 'filet',
      className: 'mcf',
    },
    {
      name: '薯餅',
      id: 'hashbrown',
      className: 'mhash',
    },
    {
      name: '汽水',
      id: 'soda',
      className: 'msoda',
    },
    {
      name: 'McCafe',
      id: 'mccafe',
      className: 'mccafe',
    },
    {
      name: '茶飲',
      id: 'tea',
      className: 'mtea',
    },
    {
      name: '玉米湯',
      id: 'corn_soup',
      className: 'mcs',
    },
    {
      name: '切換時段',
      id: 'switch',
      className: 'switch',
    },
    {
      name: '蛋捲冰淇淋',
      id: 'cone',
      className: 'mice',
    },
    {
      name: '冰炫風',
      id: 'mcflurry',
      className: 'mbf',
    },
    {
      name: 'Enter',
      id: 'enter',
      className: 'enter',
    },
  ],
  allDay: [
    {
      name: '刪除',
      id: 'del',
      className: 'del',
    },
    {
      name: 'Jingle 音效',
      id: 'mcd',
      className: 'mcd',
    },
    {
      name: '肚子餓音效',
      id: 'hungry',
      className: 'hungry',
    },
    {
      name: '口播稿',
      id: 'script',
      className: 'script',
    },
    {
      name: '牛肉類漢堡',
      id: 'beef_burger',
      className: 'beef',
    },
    {
      name: '鷄肉類漢堡',
      id: 'chicken_burger',
      className: 'chicken',
    },
    {
      name: '麥香魚',
      id: 'filet',
      className: 'mcf',
    },
    {
      name: '麥脆鷄腿',
      id: 'mccrispy',
      className: 'mct',
    },
    {
      name: '麥克鷄塊',
      id: 'nuggets',
      className: 'mcn',
    },
    {
      name: '勁辣香鷄翅',
      id: 'spicy_wings',
      className: 'mspicy',
    },
    {
      name: '薯條',
      id: 'fries',
      className: 'mfries',
    },
    {
      name: '蘋果派',
      id: 'apple_pie',
      className: 'mapple',
    },
    {
      name: '汽水',
      id: 'soda',
      className: 'msoda',
    },
    {
      name: 'McCafe',
      id: 'mccafe',
      className: 'mccafe',
    },
    {
      name: '茶飲',
      id: 'tea',
      className: 'mtea',
    },
    {
      name: '玉米湯',
      id: 'corn_soup',
      className: 'mcs',
    },
    {
      name: '切換時段',
      id: 'switch',
      className: 'switch',
    },
    {
      name: '蛋捲冰淇淋',
      id: 'cone',
      className: 'mice',
    },
    {
      name: '冰炫風',
      id: 'mcflurry',
      className: 'mbf',
    },
    {
      name: 'Enter',
      id: 'enter',
      className: 'enter',
    },
  ],
} as const;
