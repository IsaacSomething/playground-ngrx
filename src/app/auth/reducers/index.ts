import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { IUser } from '../model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: IUser;
}

/* export const reducers: ActionReducerMap<AuthState> = {};
 
function authReducer(state, action): AuthState {} */
