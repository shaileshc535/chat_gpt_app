import { createStore } from "redux";
import { UserType, VideoChatType } from "./types";

export interface AppStateType {
  user?: UserType;
  videoChatToken?: VideoChatType;
}

const initialState: AppStateType = {
  user: null,
  videoChatToken: null,
};

export const store = createStore(
  (state: AppStateType = initialState, action: any): AppStateType => {
    const { type } = action;
    switch (type) {
      case SET_USER:
        return { ...state, user: action.user };

      default:
        return state;
    }
  }
);

export const SET_USER = Symbol("SET_USER");
