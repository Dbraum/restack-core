import React from 'react';

import MenuItem from './MenuItem'
export default class SidebarMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			index: -1
		}
	}

	render() {

		return (
			<aside className="main-sidebar">
				<section className="sidebar">
					<ul className="sidebar-menu">
						<li className="header"></li>
						{
							(this.props.menus || []).map((item, index)=> {
									return <MenuItem {...item} key={index} active={index===this.state.index}
									                           onTreeViewMenuClick={this.handleTreeViewMenuClick.bind(this,index)}/>
								}
							)
						}
					</ul>
				</section>
			</aside>
		)
	}

	handleTreeViewMenuClick(index, event) {
		this.setState({
			index: this.state.index === index ? -1 : index
		})
	}
}

