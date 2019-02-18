import { browserHistory } from "react-router";
import { takeEvery, takeLatest } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { clearErrorsAction, storeErrorsAction } from "../actions/errorActions";
import { persistLinkAction } from "../actions/linkActions";
import {
    LoginRequestAction,
    storeSessionAction,
    StoreSessionAction,
} from "../actions/sessionActions";
import { ActionTypes } from "../constants/actionTypes";
import { postData } from "./sagaHelper";

export function* loginRequest(action: LoginRequestAction) {
    yield put(clearErrorsAction());
    const { response, error } = yield call(postData, action.link.href, action.loginInfo);
    if (response) {
        yield put(storeSessionAction(response.data.session.token));
        yield put(persistLinkAction(response.data._links.root));
        yield browserHistory.push("/");
    } else if (error) {
        yield put(storeErrorsAction(error.response.data));
    }
}

export function* watchLoginRequest() {
    yield* takeLatest(ActionTypes.LOGIN_REQUEST_ACTION, loginRequest);
}

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
