import menus from '../../routes/menu'


export default {
	namespace:'menus2',
	state:menus,
	reducer:{
		addMenu(state,action){
			return state.concat(action.payload)
		}
	}
}