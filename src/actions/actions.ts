import { Action } from "redux";
import { ActionTypes } from "../constants/actionTypes";
import { ClearErrorsAction, StoreErrorsAction } from "./errorActions";
import { PersistLinkAction } from "./linkActions";
import { LoginRequestAction, SignupRequestAction, StoreSessionAction } from "./sessionActions";

export type ApplicationAction = Action<ActionTypes> & (
    | SignupRequestAction
    | LoginRequestAction
    | StoreSessionAction
    | PersistLinkAction
    | ClearErrorsAction
    | StoreErrorsAction
);
