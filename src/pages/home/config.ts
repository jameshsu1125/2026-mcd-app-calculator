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

export type THomeState = { step: HomeStepType; page: HomePage };

export type HomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, page: HomePage.intro };
export const HomeContext = createContext<HomeContext>([HomeState, () => {}]);
