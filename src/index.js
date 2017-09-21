import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {syncHistoryWithStore} from 'react-router-redux';

import './index.css';
import Main from './containers/Main';
import myCreateStores from './store'; 

const browserHistory = createHistory();
const stores = myCreateStores(browserHistory);
const history = syncHistoryWithStore(browserHistory, stores);

ReactDOM.render(
  <Provider store={stores}>
    <Main/>
  </Provider>,
  document.getElementById('root')
);
