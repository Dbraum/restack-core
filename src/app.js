// core frameworks
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store/configureStore';
import i18n from './i18n';

import modal from './reducers/modal'
import invariant from 'invariant';
import createReducer from 'redux-updeep';
import createSaga,{cancelSagas} from './utils/createSaga';

export default class App {

	constructor(config) {
		this.config = config || {}
		this._model = []
	}

	set routes(routes) {
		this._routes = routes
	}

	set reducers(reducers) {
		this._reducers = reducers
	}

	set middlewares(middlewares) {
		this._middlewares = middlewares
	}

	set model(model) {
		this._model = model.map(checkModel)
	}

	fetchLocalePromise(needsI18n, userLocale, defaultLocale) {
		if (needsI18n && userLocale != defaultLocale) {
			return i18n.fetchLocaleData(userLocale)
				.then(localeData => {
					return {locale: userLocale, localeData}
				})
		} else {
			return Promise.resolve({locale: userLocale, localeData: {}})
		}
	}

	replaceReducer(nextReducers, models) {
		let reducers = {
			modal,
			...nextReducers
		}, sagas = [];
		for (let m of models) {
			const {namespace, state, effects} = m;
			reducers[namespace] = createReducer(namespace, state);
			if (effects) sagas.push(createSaga(m.effects, m));
		}
		cancelSagas(this.store)

		this.store.hotReplaceReducer(reducers)
		// start saga
		sagas.forEach(this.store.run);
	}

	createRootComponent({locale, localeData}) {

		let reducers = {
			modal,
			...this._reducers
		}
		let sagas = []


		for (let m of this._model) {
			const {namespace, state, effects} = m;
			reducers[namespace] = createReducer(namespace, state);
			if (effects) sagas.push(createSaga(m.effects, m));
		}


		// create store
		const initialState = window.__INITIAL_STATE__ || {};
		const store = configureStore(reducers, initialState, this._middlewares)

		// start saga
		sagas.forEach(store.run);

		this.store = store;


		const history = syncHistoryWithStore(browserHistory, store)
		const i18nTools = new i18n.Tools({localeData, locale});

		return (
			<Provider store={store}>
				<i18n.Provider i18n={i18nTools}>
					<Router history={history} children={this._routes}/>
				</i18n.Provider>
			</Provider>
		)
	}

	async render(el) {

		const {locales, defaultLocale} = this.config;

		const userLocale = i18n.getUserLocale(defaultLocale);

		const {locale, localeData} = await this.fetchLocalePromise(locales != null, userLocale, defaultLocale)

		const RootComponent = this.createRootComponent({locale, localeData})

		if (el) {
			ReactDOM.render(RootComponent, el)
		} else {
			return RootComponent;
		}

	}
}


function checkModel(m) {
	// Clone model to avoid prefixing namespace multiple times
	const model = {...m};
	const {namespace} = model;

	invariant(
		namespace,
		'app.model: namespace should be defined'
	);
	invariant(
		namespace !== 'routing',
		'app.model: namespace should not be routing, it\'s used by react-redux-router'
	);


	return model;
}
