import { createContext, Dispatch, SetStateAction } from 'react';

export enum ResultStepType {
  unset,
  fadeIn,
}

export type TResultState = { step: ResultStepType; target: HTMLDivElement | null };
export type TResultContext = [TResultState, Dispatch<SetStateAction<TResultState>>];

export const ResultState: TResultState = { step: ResultStepType.unset, target: null };
export const ResultContext = createContext<TResultContext>([ResultState, () => {}]);
