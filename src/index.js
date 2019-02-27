import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import SignupView from './components/views/SignupView';
import LoginView from './components/views/LoginView';
import TodosView from './components/views/TodosView';
import HistoryView from './components/views/HistoryView';
import './styles/index.css';
import './styles/bootstrap-overrides.css';
import { HotKeys } from 'react-hotkeys';
import { reducer } from './store';
import sessionMiddleware from './middleware/sessionMiddleware';
import resourcesMiddleware from './middleware/resourcesMiddleware';
import loadViewMiddleware from './middleware/loadViewMiddleware';
import listMiddleware from './middleware/listMiddleware';
import todoMiddleware from './middleware/todoMiddleware';

const keyMap = {
    submit: 'enter',
    cancel: 'esc'
};

const store = createStore(
    reducer,
    applyMiddleware(
        sessionMiddleware,
        resourcesMiddleware,
        loadViewMiddleware,
        listMiddleware,
        todoMiddleware,
    )
);

render(
    <HotKeys keyMap={keyMap}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={TodosView}></Route>
                <Route path="/signup" component={SignupView}></Route>
                <Route path="/login" component={LoginView}></Route>
                <Route path="/history" component={HistoryView}></Route>
            </Router>
        </Provider>
    </HotKeys>,
    document.getElementById('root')
);
