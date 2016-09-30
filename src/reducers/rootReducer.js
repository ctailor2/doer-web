import {combineReducers} from 'redux';
import {todos} from './todoReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        todos
    };
}

export default rootReducer