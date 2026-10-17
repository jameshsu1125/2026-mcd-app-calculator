import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset,
  fadeIn,
}

export enum THomePage {
  intro,
  calculator,
  result,
}

export type THomeState = { step: HomeStepType; page: THomePage };

export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, page: THomePage.intro };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
