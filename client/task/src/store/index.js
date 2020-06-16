import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { usersReducer, articlesReducer } from './reducers';

const rootReducer = combineReducers({
  articles: articlesReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
