import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';

import menus from './menus'


/*export default combineReducers({
 routing: routerReducer,
 menus:menus
 });*/

export default {
 menus:menus
 };
