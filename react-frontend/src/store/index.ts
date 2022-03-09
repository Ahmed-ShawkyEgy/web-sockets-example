import { driversReducer } from './slices/drivers/reducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
const { combineReducers } = require('redux');

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({ drivers: driversReducer });

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
