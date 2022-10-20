import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const user = createSelector(selectAuthState, auth => auth.user);
export const role = createSelector(selectAuthState, auth => auth.user?.role);
export const isLoggedIn = createSelector(selectAuthState, auth => !!auth.user);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);
