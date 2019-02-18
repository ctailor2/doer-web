import { SignupRequestAction, LoginRequestAction, StoreSessionAction } from "./sessionActions";
import { Action } from "redux";
import { ActionTypes } from "../constants/actionTypes";
import { PersistLinkAction } from "./linkActions";
import { ClearErrorsAction, StoreErrorsAction } from "./errorActions";

export type ApplicationAction = Action<ActionTypes> & (
    | SignupRequestAction
    | LoginRequestAction
    | StoreSessionAction
    | PersistLinkAction
    | ClearErrorsAction
    | StoreErrorsAction
)