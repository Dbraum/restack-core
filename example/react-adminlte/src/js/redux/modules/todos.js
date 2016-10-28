import u from 'updeep'

export default {
	namespace: 'todos',
	state: ['fasdf','1','fsadfas','fasdf'],
	effects: {
		*addTodoItem({ payload: item }, { put }) {
			yield put({ type: 'todos/addItem', payload: state=>[...state,item] });
		},
		*removeTodoItem({ payload: itemIndex }, { put }) {
			yield put({ type: 'todos/removeItem', payload: u.reject((item, index)=>{
				return index === itemIndex
			}) });
		}
	},

}