import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import SignupView from './components/views/SignupView';
import LoginView from './components/views/LoginView';
import './styles/index.css';
import './styles/bootstrap-overrides.css';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';
import {HotKeys} from 'react-hotkeys';

const keyMap = {
  submit: 'enter',
  cancel: 'esc'
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

render(
	<HotKeys keyMap={keyMap}>
	  <Provider store={store}>
	    <Router history={browserHistory}>
	      <Route path="/" component={App}></Route>
	      <Route path="/signup" component={SignupView}></Route>
	      <Route path="/login" component={LoginView}></Route>
	    </Router>
	  </Provider>
	</HotKeys>,
	document.getElementById('root')
);
