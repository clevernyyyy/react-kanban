import React from 'react';
import {Provider} from 'react-redux';
import App from './App.js';
import DevTools from './DevTools.js';

export default ({store}) =>
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
