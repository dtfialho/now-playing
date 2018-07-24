import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import axios from 'axios';

import './index.css';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

window.axios = axios;

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);