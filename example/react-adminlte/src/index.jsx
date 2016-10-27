import React from 'react';
import ApiClient from './js/helpers/ApiClient';
import routes from './js/routes';

import { App } from '../../../lib/index'
import createMiddleware from './js/redux/middleware/clientMiddleware';
import reducer  from './js/redux/modules/reducer';

const client = new ApiClient();
const app = new App({})

app.routes = routes
app.reducers = reducer
app.middlewares = [createMiddleware(client)]

app.render( document.getElementById('react-view') )