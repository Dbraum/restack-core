import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {
	App,
	NotFound,
	TodePage,
} from './../containers';

export default <Route path="/" component={App}>
	<IndexRoute component={Dashboard}/>
	<Route path="about" component={About}/>
	<Route path="todoPage" component={TodePage}/>
	<Route path="dashboard" component={Dashboard}/>
	<Route path="inbox" component={Inbox}>
		<Route path="messages/:id" component={Message}/>
	</Route>
	{ /* Catch all route */ }
	<Route path="*" component={NotFound} status={404} />
</Route>

function About() {
	return <h3>About</h3>
}

function Dashboard() {
	return <h3>Dashboard</h3>
}



function Inbox(props) {
	return (
		<div>
			<h2>Inbox</h2>
			{props.children}
		</div>
	)
}
function Message(props) {
	return <h3>Message {props.params.id}</h3>
}
