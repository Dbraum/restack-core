export default {
	namespace: 'MY_REDUCER',
	state: [],
	effects: {
		*addItemWithSaga({ payload: item }, { put }) {
			yield put({ type: 'MY_REDUCER/saveItem', payload: state=>[...state,item] });
		}
	},

}