import { createContext, Dispatch, SetStateAction } from 'react';

export enum IntroStepType {
  unset,
  loading,
  fadeIn,
  frameDidBlanking,
  frameDidFadeIn,
  zoomIn,
  ending,
}
export type TIntroState = { step: IntroStepType };
export type TIntroContext = [TIntroState, Dispatch<SetStateAction<TIntroState>>];

export const IntroState = { step: IntroStepType.unset };
export const IntroContext = createContext<TIntroContext>([IntroState, () => {}]);
