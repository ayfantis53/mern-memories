// npm installs
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import { thunk                    } from 'redux-thunk';

// project imports
import reducers from '../reducers/reducer';


/**
 * 
 * @return Our credentials and memory making stores for api requests
 */
export const store = configureStore(
  {
    reducer: reducers
  }, 
  compose(applyMiddleware(thunk))
);
