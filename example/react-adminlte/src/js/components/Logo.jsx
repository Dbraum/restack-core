import React from 'react';
export default class SidebarMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a href="index2.html" className="logo">
				<span className="logo-mini"><b>A</b>LT</span>
				<span className="logo-lg"><b>Admin</b>LTE</span>
			</a>
		)
	}
}

