import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Modal = 'modal',
  UserResult = 'userResult',
}

export enum LoadingProcessType {
  Ball = 'balls',
  Bars = 'bars',
  Bubbles = 'bubbles',
  Cubes = 'cubes',
  Cylon = 'cylon',
  Spin = 'spin',
  SpinningBubbles = 'spinningBubbles',
  Spokes = 'spokes',
  BounceSmooth = 'bounceSmooth',
}

export enum TransitionType {
  Unset = 0,
  FadeIn = 1,
  FadeOut = 2,
  DidFadeIn = 3,
  DidFadeOut = 4,
  Loop = 5,
  Stop = 6,
}

export type TLoadingProcessState = {
  enabled?: boolean;
  type?: LoadingProcessType;
  body?: string;
};

export type TModalState = {
  enabled?: boolean;
  body?: ReactNode;
};

export type TUserResultState = {
  input: { className: string; dataset: string }[];
};

export interface IState {
  [ActionType.Page]?: string;
  [ActionType.LoadingProcess]?: TLoadingProcessState;
  [ActionType.Modal]?: TModalState;
  [ActionType.UserResult]?: TUserResultState;
}

export interface IAction {
  state: IState | Partial<IState[ActionType]>;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
