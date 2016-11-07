import u from 'updeep'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* addTodoItem({ payload: item }, { put,call }) {
	yield call(delay, 500)
	yield put({ type: 'todos/addItem', payload: state=>[...state,item] });
}


export default {
	namespace: 'todos',
	state: [],
	effects: {
		addTodoItem,
		*addTodoItem2({ payload: item }, { put,call}) {
			//或者可以这样调用，两种调用方式没区别  yield addTodoItem(...arguments)
			yield call(addTodoItem,{ payload: 1 }, { put,call }) 
			yield put({ type: 'todos/addItem', payload: state=>[...state,item] });
		},
		*removeTodoItem({ payload: itemIndex }, { put }) {
			yield put({ type: 'todos/removeItem', payload: u.reject((item, index)=>{
				return index === itemIndex
			}) });
		}
	}
}