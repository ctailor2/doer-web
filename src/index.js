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
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    // TODO: replace with root reducer once a reducer is added
    () => {},
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/signup" component={SignupView}></Route>
      <Route path="/login" component={LoginView}></Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
