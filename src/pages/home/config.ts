import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset,
  fadeIn,
}

export enum HomePageType {
  intro,
  calculator,
  result,
}

export type THomeState = { step: HomeStepType; page: HomePageType };

export type HomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, page: HomePageType.result };
export const HomeContext = createContext<HomeContext>([HomeState, () => {}]);
