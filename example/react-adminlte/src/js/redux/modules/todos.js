import u from 'updeep'
import get from 'lodash/get';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* addTodoItem({payload: item}, {put, call}) {
	yield call(delay, 500)
	yield put({type: 'todos/addItem', payload: state=>[...state, item]});
}


export default {
	namespace: 'todos',
	state: [],
	effects: {
		*addTodoItem2({payload: item}, {call, put,update}) {
			//或者可以这样调用，两种调用方式没区别  yield addTodoItem(...arguments)
			//yield call(addTodoItem,{ payload: 1 }, { put,call })
			//yield put({type:'addTodoItem',payload:item})
			//yield put({ type: 'todos/addItem', payload: state=>[...state,item] });
			yield update({payload: state=>[...state, item]});
		},
		*removeTodoItem({payload: itemIndex}, {put, update}) {
			yield update({
				payload: u.reject((item, index)=> {
					return index === itemIndex
				})
			});
		}
	}

}




