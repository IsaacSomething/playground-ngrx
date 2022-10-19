import { createAction, props } from '@ngrx/store';
import { IUser } from './model';

export const login = createAction('[Login Page] User Login', props<{ user: IUser }>());
export const logout = createAction('[Logout] Logout');
