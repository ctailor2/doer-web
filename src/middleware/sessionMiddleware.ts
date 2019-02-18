import { Dispatch } from 'redux';
import { ApplicationStore } from '../store';
import { ActionTypes } from '../constants/actionTypes';
import { postCommand } from '../sagas/sagaHelper';
import { storeSessionAction } from '../actions/sessionActions';
import { ApplicationAction } from '../actions/actions';
import { browserHistory } from 'react-router';

export default (store: ApplicationStore) => (next: Dispatch) => (action: ApplicationAction) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            })
            postCommand(action.type, action.link, action.signupInfo,
                (signupResult) => {
                    store.dispatch({
                        type: ActionTypes.STORE_SESSION_ACTION,
                        token: signupResult.session.token
                    })
                    store.dispatch({
                        type: ActionTypes.PERSIST_LINK_ACTION,
                        link: signupResult._links.root
                    })
                    browserHistory.push('/');
                },
                (error) => {
                    store.dispatch({
                        type: ActionTypes.STORE_ERRORS_ACTION,
                        errors: error
                    })
                })
            break;
        }
    }
    next(action);
}