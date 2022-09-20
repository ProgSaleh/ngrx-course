import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from "@ngrx/store";
import { AuthActions } from "../actionTypes";
import { User } from "../model/user.model";
// import { environment } from "../../environments/environment";
// export const authFeatureKey = "auth";
//

// Skeleton of the reducer function is defined in this generated file.

// Skeleton of the new state
export interface AuthState {
  user: User;
}

// Store needs an init state of a specific structure.
// So, rather than having it start as '{}',
// we give it the desired structure declared explicitly 'undefined'
export const initialAuthState: AuthState = {
  user: undefined,
};

// This is the reducer function.
// It receives the current store state and NgRx 'ons()' to handle actions.
// IT IS A PURE FUNCTION.. IT RETURNS A NEW VERSION OF THE STATE.
// Think of it as a new state producer.
/**
 * @description Reducer function. implemented to respond to any Auth action.
 *
 * @param initialAuthState: string. Intially, the store of Auth state is empty,
 *        so this params is passed only for the initial state.
 *        It basically defines a skeleton for the state.
 * @param on: fn. on(actionType: string, realActionToPerform: fn)
 *        Each on() is passed two params;
 *          1. an action type.
 *          2. A function to perform on the state.
 *          ALL on() MUST @return new IMMUTABLY modified state.
 */
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
