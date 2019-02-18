import { ReducersMapObject, combineReducers, Store, Reducer } from "redux";
import { reducers } from "./reducers/rootReducer";
import { ApplicationAction } from "./actions/actions";

export type ApplicationState = ReturnType<typeof reducer>;

export type ApplicationStore = Store<ApplicationState, ApplicationAction>;

export const reducer: Reducer<typeof reducers extends ReducersMapObject<infer State, ApplicationAction> ? State : never, ApplicationAction> = combineReducers(reducers);
