import React from 'react';
import routes from './js/routes';
import { App } from 'restack-core'
import reducer,{models}  from './js/redux';

const app = new App({})

app.routes = routes
app.reducers = reducer
app.model = models

app.render( document.getElementById('react-view') )

if (module.hot) {
	module.hot.accept('./js/routes/index', () => {
		app.render( document.getElementById('react-view') )
	});
	module.hot.accept('./js/redux', () => {
		const nextReducer = require('./js/redux')
		app.replaceReducer(nextReducer.default,nextReducer.models)
	});
}
