import menus from '../../routes/menu'
const ADDMENU = 'react-adminlte/menus/ADDMENU';

const initialState = menus||[];

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case ADDMENU:
			return {
				data: state.concat(action.payload)
			};
		default:
			return state;
	}
}

export function addMenus(menus) {
	return {
		type: ADDMENU,
		payload:menus
	};
}
