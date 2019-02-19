import { browserHistory } from "react-router";
import { takeEvery, takeLatest } from "redux-saga";
import {
    StoreSessionAction,
} from "../actions/sessionActions";
import { ActionTypes } from "../constants/actionTypes";

export function* logoutRequest() {
    yield localStorage.removeItem("sessionToken");
    yield localStorage.removeItem("link");
    yield browserHistory.push("/login");
}

export function* watchLogoutRequest() {
    yield* takeLatest(ActionTypes.LOGOUT_REQUEST_ACTION, logoutRequest);
}

export function* storeSession(action: StoreSessionAction) {
    yield localStorage.setItem("sessionToken", action.token);
}

export function* watchStoreSession() {
    yield* takeEvery(ActionTypes.STORE_SESSION_ACTION, storeSession);
}
