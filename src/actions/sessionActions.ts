import { ActionTypes } from '../constants/actionTypes'
import { Action } from 'redux';

export interface Link {
    href: string;
}

export type ApplicationAction = SignupRequestAction | LoginRequestAction

export interface SignupRequestAction {
    type: ActionTypes.SIGNUP_REQUEST_ACTION;
    link: Link;
    signupInfo: SignupInfo;
}

export interface SignupInfo {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export const signupRequestAction = (link: Link, signupInfo: SignupInfo): SignupRequestAction => ({
    type: ActionTypes.SIGNUP_REQUEST_ACTION,
    link,
    signupInfo
})

export interface LoginRequestAction {
    type: ActionTypes.LOGIN_REQUEST_ACTION;
    link: Link;
    loginInfo: LoginInfo;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export const loginRequestAction = (link: Link, loginInfo: LoginInfo): LoginRequestAction => ({
    type: ActionTypes.LOGIN_REQUEST_ACTION,
    link,
    loginInfo,
})

export interface LogoutRequestAction {
    type: ActionTypes.LOGOUT_REQUEST_ACTION;
}

export const logoutRequestAction = (): LogoutRequestAction => ({
    type: ActionTypes.LOGOUT_REQUEST_ACTION
})

export interface StoreSessionAction {
    type: ActionTypes.STORE_SESSION_ACTION;
    token: string;
}

export const storeSessionAction = (token: string): StoreSessionAction => ({
    type: ActionTypes.STORE_SESSION_ACTION,
    token
})