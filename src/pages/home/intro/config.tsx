import { createContext, Dispatch, SetStateAction } from 'react';

export enum IntroStepType {
  unset,
  loading,
  fadeIn,
  frameDidBlanking,
  frameDidFadeIn,
  frameDidZoomed,
  ending,
}
export type TIntroState = {
  step: IntroStepType;
  appendFastPass: boolean;
  shouldEndFadeIn: boolean;
};
export type TIntroContext = [TIntroState, Dispatch<SetStateAction<TIntroState>>];

export const IntroState = {
  step: IntroStepType.unset,
  appendFastPass: true,
  shouldEndFadeIn: false,
};
export const IntroContext = createContext<TIntroContext>([IntroState, () => {}]);
