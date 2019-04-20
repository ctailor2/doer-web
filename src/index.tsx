import React from 'react';
import { render } from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import HistoryView from './components/views/HistoryView';
import LoginView from './components/views/LoginView';
import SignupView from './components/views/SignupView';
import TodosView from './components/views/TodosView';
import listMiddleware from './middleware/listMiddleware';
import loadViewMiddleware from './middleware/loadViewMiddleware';
import resourcesMiddleware from './middleware/resourcesMiddleware';
import sessionMiddleware from './middleware/sessionMiddleware';
import todoMiddleware from './middleware/todoMiddleware';
import { reducer } from './store';
import './styles/bootstrap-overrides.css';
import './styles/index.css';

const keyMap = {
    submit: 'enter',
    cancel: 'esc',
};

const store = createStore(
    reducer,
    applyMiddleware(
        sessionMiddleware,
        resourcesMiddleware,
        loadViewMiddleware,
        listMiddleware,
        todoMiddleware,
    ),
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
    document.getElementById('root'),
);
