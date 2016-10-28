import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
// middlewares
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'
// reducers
import {routerReducer, routerMiddleware as createRouterMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'

import createSagaMiddleware from 'redux-saga/lib/internal/middleware';

export default function configureStore(rootReducer, initialState, middlewares = []) {

	rootReducer = combineReducers({
		...rootReducer,
		routing: routerReducer
	})

	// enable navigation via redux actions
	// https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions
	// http://stackoverflow.com/questions/32612418/transition-to-another-route-on-successful-async-redux-action/32922381#32922381
	const routerMiddleware = createRouterMiddleware(browserHistory)
	//apply saga middleware
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, createLogger(), routerMiddleware, sagaMiddleware, ...middlewares),
			DevTools.instrument()
		)
	)

	// extend store
	store.run = sagaMiddleware.run ;

	store.hotReplaceReducer = (reducer) => {
		store.replaceReducer(combineReducers({
			...reducer,
			routing: routerReducer
		}))
	}

	// if (module.hot) {
	//   // Enable Webpack hot module replacement for reducers
	//   module.hot.accept('../reducers', () => {
	//     const nextRootReducer = require('../reducers').default
	//     store.replaceReducer(nextRootReducer)
	//   })
	// }


	return store
}
