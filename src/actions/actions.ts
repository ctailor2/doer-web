import { Action } from "redux";
import { ActionTypes } from "../constants/actionTypes";
import { ClearErrorsAction, DismissGlobalAlertAction, StoreErrorsAction } from "./errorActions";
import { PersistLinkAction, StoreLinksAction } from "./linkActions";
import {
    GetCompletedListRequestAction,
    GetListRequestAction,
    StoreCompletedListAction,
    StoreListAction,
    UnlockListRequestAction,
} from "./listActions";
import { LoadHistoryViewAction, LoadTodosViewAction } from "./loadViewActions";
import {
    GetBaseResourcesRequestAction,
    GetHistoryResourcesRequestAction,
    GetRootResourcesRequestAction,
    GetTodoResourcesRequestAction,
} from "./resourcesActions";
import { LoginRequestAction, LogoutRequestAction, SignupRequestAction, StoreSessionAction } from "./sessionActions";
import {
    CompleteTodoRequestAction,
    CreateTodoRequestAction,
    DeleteTodoRequestAction,
    DisplaceTodoRequestAction,
    EscalateTodosRequestAction,
    MoveTodoRequestAction,
    PullTodosRequestAction,
    UpdateTodoRequestAction,
} from "./todoActions";

export type ApplicationAction = Action<ActionTypes> & (
    | SignupRequestAction
    | LoginRequestAction
    | LogoutRequestAction
    | StoreSessionAction
    | PersistLinkAction
    | StoreLinksAction
    | ClearErrorsAction
    | StoreErrorsAction
    | DismissGlobalAlertAction
    | GetListRequestAction
    | GetCompletedListRequestAction
    | StoreListAction
    | StoreCompletedListAction
    | UnlockListRequestAction
    | LoadTodosViewAction
    | LoadHistoryViewAction
    | GetRootResourcesRequestAction
    | GetBaseResourcesRequestAction
    | GetTodoResourcesRequestAction
    | GetHistoryResourcesRequestAction
    | CreateTodoRequestAction
    | DeleteTodoRequestAction
    | MoveTodoRequestAction
    | DisplaceTodoRequestAction
    | UpdateTodoRequestAction
    | CompleteTodoRequestAction
    | PullTodosRequestAction
    | EscalateTodosRequestAction
);
