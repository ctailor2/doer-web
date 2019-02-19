import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";

export default (actions: ApplicationAction[]): Middleware =>
    (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
        actions.push(action);
        next(action);
    };
