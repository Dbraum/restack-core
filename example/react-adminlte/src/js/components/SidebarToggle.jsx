import React from 'react';
export default class SidebarMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className="navbar navbar-static-top" role="navigation">
				<a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span className="sr-only">Toggle navigation</span>
				</a>
			</nav>
		)
	}
}

