import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
// middlewares
import thunk from 'redux-thunk'
// reducers
import {routerReducer, routerMiddleware as createRouterMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'
import createSagaMiddleware from 'redux-saga/lib/internal/middleware';

export default function configureStore(rootReducer, initialState, middlewares = []) {

	rootReducer = combineReducers({
		...rootReducer,
		routing: routerReducer
	})

	const routerMiddleware = createRouterMiddleware(browserHistory)
	//apply saga middleware
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, routerMiddleware, sagaMiddleware, ...middlewares)
	)
	// extend store
	store.run = sagaMiddleware.run ;

	return store
}
