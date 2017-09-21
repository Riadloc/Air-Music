import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import * as reducers from './reducers/index';

const loggerMiddleware = createLogger();

function myCreateStores(history, initialState){
  const middleware = routerMiddleware(history);
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    middleware,
    loggerMiddleware
  )(createStore);
  
  const rootReducer = combineReducers({
    ...reducers,
    //key 必须为routing
    routing: routerReducer
  });
  return createStoreWithMiddleware(rootReducer, initialState);
}

export default myCreateStores;