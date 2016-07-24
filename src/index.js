import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import './styles/index.css';

// Replace the noop function with rootReducer once a reducer is added
let store = createStore(() => {});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
