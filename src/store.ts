import { createStore, ReducersMapObject, combineReducers, Action, Store, Reducer } from "redux";
import { SignupRequestAction, LoginRequestAction } from "./actions/sessionActions";
import { ActionTypes } from "./constants/actionTypes";
import { reducers } from "./reducers/rootReducer";

export type ApplicationState = ReturnType<typeof reducer>;

export type ApplicationAction = Action<ActionTypes> & (
    | SignupRequestAction
    | LoginRequestAction
)

export type ApplicationStore = Store<ApplicationState, ApplicationAction>;

export const reducer: Reducer<typeof reducers extends ReducersMapObject<infer State, ApplicationAction> ? State : never, ApplicationAction> = combineReducers(reducers);
