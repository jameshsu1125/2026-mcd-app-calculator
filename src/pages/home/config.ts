import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset,
  fadeIn,
}

export enum HomePage {
  intro,
  calculator,
  result,
}

export type HomeState = { step: HomeStepType; page: HomePage };

export type HomeContext = [HomeState, Dispatch<SetStateAction<HomeState>>];

export const HomeState = { step: HomeStepType.unset, page: HomePage.intro };
export const HomeContext = createContext<HomeContext>([HomeState, () => {}]);
