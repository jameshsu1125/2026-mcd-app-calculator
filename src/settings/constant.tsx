import { createContext } from 'react';
import { PAGE } from './config';
import {
  ActionType,
  IAction,
  IState,
  LoadingProcessType,
  TContext,
  TLoadingProcessState,
  TModalState,
  TUserResultState,
} from './type';

export const LoadingProcessState: TLoadingProcessState = {
  enabled: false,
  type: LoadingProcessType.BounceSmooth,
  body: 'LOADING...',
};

export const ModalState: TModalState = {
  enabled: false,
  body: (
    <>
      親愛的麥粉 <br />
      已達輸入上限啦😅
    </>
  ),
};

// 開發用的預設值（直接進結果頁時用）。id 要跟 useMcdDeal 的按鍵 id 一樣。
export const UserResultState: TUserResultState = {
  time: 'allDay',
  input: [
    { className: 'chicken', dataset: { name: '鷄肉類漢堡', id: 'chicken_burger' } },
    { className: 'mspicy', dataset: { name: '勁辣香鷄翅', id: 'spicy_wings' } },
    { className: 'mfries', dataset: { name: '薯條', id: 'fries' } },
  ],
};

export const InitialState: IState = {
  [ActionType.Page]: PAGE.home,
  [ActionType.LoadingProcess]: LoadingProcessState,
  [ActionType.Modal]: ModalState,
  [ActionType.UserResult]: UserResultState,
};

export const Context = createContext<TContext>([InitialState, () => {}]);
export const Reducer = (state: IState, action: IAction): IState => {
  if (action.state instanceof Object) {
    let stateStorage: { [key: string]: any } = {};
    Object.entries(action.state)
      .filter((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0 || action.type) return true;
        return false;
      })
      .map((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0) return actionState;
        return [action.type, Object.fromEntries([actionState])];
      })
      .forEach((actionState) => {
        if (actionState) {
          const [key, value] = actionState;
          const stringKey = String(key);
          const cloneVale = Object.fromEntries(
            Object.entries(state).filter((stateValue) => stateValue[0] === stringKey),
          )[action.type];
          if (Object.prototype.hasOwnProperty.call(stateStorage, stringKey)) {
            stateStorage = {
              [stringKey]: { ...stateStorage[stringKey], ...value },
            };
          } else stateStorage = { [stringKey]: { ...cloneVale, ...value } };
        }
      });
    return { ...state, ...stateStorage };
  }
  if (action.type) return { ...state, [action.type]: action.state };
  return state;
};
