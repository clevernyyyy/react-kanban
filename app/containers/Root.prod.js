import React from 'react';
import {Provider} from 'react-redux';
import App from './App.js';

export default ({store}) =>
  <Provider store={store}>
    <App />
  </Provider>
