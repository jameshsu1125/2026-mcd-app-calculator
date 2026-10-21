import { createContext, Dispatch, SetStateAction } from 'react';

export enum ResultStepType {
  unset,
  fadeIn,
}

export type TResultState = { step: ResultStepType };
export type TResultContext = [TResultState, Dispatch<SetStateAction<TResultState>>];

export const ResultState = { step: ResultStepType.unset };
export const ResultContext = createContext<TResultContext>([ResultState, () => {}]);
