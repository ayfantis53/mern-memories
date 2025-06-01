// npm installs
import { combineReducers } from "redux";

// project imports
import postReducer from './posts.reducers';
import authReducer from "./auth.reducers";


export default combineReducers({ posts: postReducer, auth: authReducer });