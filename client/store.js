import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

//same as posts:posts key value in es5 but in es6 we can write it like this
const defaultState = {
  posts,
  comments
}

//enhancing store for redux tools extension
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const store = createStore(rootReducer, defaultState,enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

//for hot reloading reducers
if(module.hot){
  module.hot.accept('./reducers/',()=>{
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
