import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import SignupView from './components/SignupView';
import './styles/index.css';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
// Replace the noop function with rootReducer once a reducer is added
    () => {},
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/signup" component={SignupView}></Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
