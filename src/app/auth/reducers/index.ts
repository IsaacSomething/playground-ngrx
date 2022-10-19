import { ActionReducer, ActionReducerMap, createFeatureSelector, createReducer, createSelector, MetaReducer, on } from '@ngrx/store';
import { AuthActions, IUser } from '../model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: IUser | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined
};

/* export const reducers: ActionReducerMap<AuthState> = {}; */

/**
 * Auth reducer defines the initial state
 * Defines response to what should be done with a login action
 * |> save the user in memory store
 */
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  })
);
