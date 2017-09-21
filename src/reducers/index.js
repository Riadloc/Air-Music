import {combineReducers} from 'redux';
import recomond from './recommond';
import song from './song';
import search from './search';

export const stores = combineReducers({...recomond, ...song, ...search});