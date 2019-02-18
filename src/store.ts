import { combineReducers, Reducer, ReducersMapObject, Store } from "redux";
import { ApplicationAction } from "./actions/actions";
import { reducers } from "./reducers/rootReducer";

export type ApplicationState = ReturnType<typeof reducer>;

export type ApplicationStore = Store<ApplicationState, ApplicationAction>;

export const reducer: Reducer<
    typeof reducers extends ReducersMapObject<infer State, ApplicationAction> ? State : never,
    ApplicationAction
> = combineReducers(reducers);
