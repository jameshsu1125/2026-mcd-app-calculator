import { createContext, Dispatch, SetStateAction } from 'react';

export enum IDesktopStepType {
  unset,
  fadeIn,
  fadeOut,
  qrcode,
}

export type TDesktopState = { step: IDesktopStepType; shouldCheckFadeIn: boolean };
export type TDesktopContext = [TDesktopState, Dispatch<SetStateAction<TDesktopState>>];

export const DesktopState: TDesktopState = {
  step: IDesktopStepType.unset,
  shouldCheckFadeIn: false,
};
export const DesktopContext = createContext<TDesktopContext>([DesktopState, () => {}]);
