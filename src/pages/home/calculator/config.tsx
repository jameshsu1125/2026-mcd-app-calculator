import { createContext, Dispatch, SetStateAction } from 'react';

type TimePeriod = 'breakfast' | 'allDay';

export type TCalculatorState = { time: TimePeriod };
export type TCalculatorContext = [TCalculatorState, Dispatch<SetStateAction<TCalculatorState>>];

export const CalculatorState: TCalculatorState = {
  time: new Date().getHours() < 11 ? 'breakfast' : 'allDay',
};

export const CalculatorContext = createContext<TCalculatorContext>([CalculatorState, () => {}]);

export const Keyboards = {
  breakfast: [
    {
      name: '刪除',
      className: 'del',
    },
    {
      name: 'Jingle 音效',
      className: 'mcd',
    },
    {
      name: '早晨鳥叫聲',
      className: 'bird',
    },
    {
      name: '口播稿',
      className: 'script',
    },
    {
      name: '滿福堡系列',
      className: 'mcb',
    },
    {
      name: '鬆餅系列',
      className: 'mpf',
    },
    {
      name: '焙果系列',
      className: 'mbg',
    },
    {
      name: '蛋堡系列',
      className: 'meb',
    },
    {
      name: '麥克鷄塊',
      className: 'mcn',
    },
    {
      name: '麥香鷄',
      className: 'mcc',
    },
    {
      name: '麥香魚',
      className: 'mcf',
    },
    {
      name: '薯餅',
      className: 'mhash',
    },
    {
      name: '汽水',
      className: 'msoda',
    },
    {
      name: 'McCafe',
      className: 'mccafe',
    },
    {
      name: '茶飲',
      className: 'mtea',
    },
    {
      name: '玉米湯',
      className: 'mcs',
    },
    {
      name: '切換時段',
      className: 'switch',
    },
    {
      name: '蛋捲冰淇淋',
      className: 'mice',
    },
    {
      name: '冰炫風',
      className: 'mbf',
    },
    {
      name: 'Enter',
      className: 'enter',
    },
  ],
  allDay: [
    {
      name: '刪除',
      className: 'del',
    },
    {
      name: 'Jingle 音效',
      className: 'mcd',
    },
    {
      name: '肚子餓音效',
      className: 'hungry',
    },
    {
      name: '口播稿',
      className: 'script',
    },
    {
      name: '牛肉類漢堡',
      className: 'beef',
    },
    {
      name: '鷄肉類漢堡',
      className: 'chicken',
    },
    {
      name: '麥香魚',
      className: 'mcf',
    },
    {
      name: '麥脆鷄腿',
      className: 'mct',
    },
    {
      name: '麥克鷄塊',
      className: 'mcn',
    },
    {
      name: '勁辣香鷄翅',
      className: 'mspicy',
    },
    {
      name: '薯條',
      className: 'mfries',
    },
    {
      name: '蘋果派',
      className: 'mapple',
    },
    {
      name: '汽水',
      className: 'msoda',
    },
    {
      name: 'McCafe',
      className: 'mccafe',
    },
    {
      name: '茶飲',
      className: 'mtea',
    },
    {
      name: '玉米湯',
      className: 'mcs',
    },
    {
      name: '切換時段',
      className: 'switch',
    },
    {
      name: '蛋捲冰淇淋',
      className: 'mice',
    },
    {
      name: '冰炫風',
      className: 'mbf',
    },
    {
      name: 'Enter',
      className: 'enter',
    },
  ],
};
