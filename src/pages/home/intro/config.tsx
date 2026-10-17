import { createContext, Dispatch, SetStateAction } from 'react';

export enum IntroStepType {
  unset,
  loading,
  fadeIn,
  frameDidBlanking,
  frameDidFadeIn,
  frameDidZoomed,
  patternDidFadeIn,
  ending,
}
export type IntroState = {
  step: IntroStepType;
  appendFastPass: boolean;
  shouldEndFadeIn: boolean;
  shouldCheckFadeIn: boolean;
};
export type IntroContext = [IntroState, Dispatch<SetStateAction<IntroState>>];

export const IntroState = {
  step: IntroStepType.unset,
  appendFastPass: true,
  shouldEndFadeIn: false,
  shouldCheckFadeIn: false,
};
export const IntroContext = createContext<IntroContext>([IntroState, () => {}]);

export const END_STAY_DURATION = 1000;
