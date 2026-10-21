import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Modal = 'modal',
  UserResult = 'userResult',
  Scroll = 'scroll',
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

export type TScrollState = {
  enabled?: boolean;
};

export type TUserResultState = {
  // 使用者按 Enter 當下鍵盤的時段。麥香魚、汽水等按鍵兩個時段都有，
  // 同一組 id 在早餐和午晚餐算出來的結果不同，所以一定要跟著 input 存。
  time: 'breakfast' | 'allDay';
  input: { className: string; dataset: { id: string; name: string } }[];
};

export interface IState {
  [ActionType.Page]?: string;
  [ActionType.LoadingProcess]?: TLoadingProcessState;
  [ActionType.Modal]?: TModalState;
  [ActionType.UserResult]?: TUserResultState;
  [ActionType.Scroll]?: TScrollState;
}

export interface IAction {
  state: IState | Partial<IState[ActionType]>;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
