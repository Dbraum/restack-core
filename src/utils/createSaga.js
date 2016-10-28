import invariant from 'invariant';
import warning from 'warning';
import * as sagaEffects from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga/lib/internal/sagaHelpers';

const SEP = '/';
export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';


export default function createSaga(effects, model) {
	return function *() {
		for (let key in effects) {
			const watcher = getWatcher(key, effects[key], model);
			yield sagaEffects.fork(createAbortableSaga(watcher));
		}
	}
}


function createAbortableSaga(saga) {
	if (process.env.NODE_ENV === 'production') {
		return saga;
	} else {
		return function* main () {
			const sagaTask = yield sagaEffects.fork(saga);
			yield sagaEffects.take(CANCEL_SAGAS_HMR);
			yield sagaEffects.cancel(sagaTask);
		};
	}
}

export function cancelSagas(store) {
	store.dispatch({
		type: CANCEL_SAGAS_HMR
	});
}

function getWatcher(key,_effect,model) {
	let effect = _effect;
	let type = 'takeEvery';
	let ms;
	if (Array.isArray(_effect)) {
		effect = _effect[0];
		const opts = _effect[1];
		if (opts && opts.type) {
			type = opts.type;
			if (type === 'throttle') {
				invariant(
					opts.ms,
					'app.start: opts.ms should be defined if type is throttle'
				);
				ms = opts.ms;
			}
		}
		invariant(
			['watcher', 'takeEvery', 'takeLatest', 'throttle'].indexOf(type) > -1,
			'app.start: effect type should be takeEvery, takeLatest, throttle or watcher'
		);
	}

	function *sagaWithCatch(...args) {
		/*try {
			yield effect(...args.concat(createEffects(model)));
		} catch(e) {
			onError(e);
		}*/

		yield effect(...args.concat(createEffects(model)));
	}

	switch (type) {
		case 'watcher':
			return sagaWithCatch;
		case 'takeLatest':
			return function*() {
				yield takeLatest(key, sagaWithCatch);
			};
		// takeEvery
		default:
			return function*() {
				yield takeEvery(key, sagaWithCatch);
			};
	}
}


function prefixType(type, model) {
	/*const prefixedType = `${model.namespace}${SEP}${type}`;
	if ((model.reducers && model.reducers[prefixedType])
		|| (model.effects && model.effects[prefixedType])) {
		return prefixedType;
	}*/
	return type;
}

function createEffects(model) {
	function put(action) {
		const { type } = action;
		invariant(type, 'dispatch: action should be a plain Object with type');
		/*warning(
			type.indexOf(`${model.namespace}${SEP}`) !== 0,
			`effects.put: ${type} should not be prefixed with namespace ${model.namespace}`
		);*/
		return sagaEffects.put({ ...action, type: prefixType(type, model) });
	}
	return { ...sagaEffects, put };
}