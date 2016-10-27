import React from 'react';
import {Link} from 'react-router'

import './index.css'
export default class MenuItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: -1
		}
	}

	render() {
		const {children, title, icon, active, path, onTreeViewMenuClick} = this.props;
		if (children) {
			return <li className={`treeview ${active?"active":''}`}>
				<Link to={`${path}`} onClick={onTreeViewMenuClick}>
					<i className={`fa ${icon}`}></i>
					<span>{title}</span>
			<span className="pull-right-container">
				<i className="fa fa-angle-left pull-right"></i>
			</span>
				</Link>
				<ul className={`treeview-menu ${active?"menu-open":""}`}>
					{children.map(
						(item, index)=> {
							return <SubItem key={index} parentPath={path} active={index === this.state.index}
							                onSubItemClick={this.handleSubItemClick.bind(this,index)} {...item}/>
						}
					)}


				</ul>
			</li>
		}

		return (
			<li className={active?"active":""} onClick={onTreeViewMenuClick}>
				<Link to={`${path}`}>
					{icon ? <i className={`fa ${icon}`}></i> : ""}
					<span>{title}</span>
				</Link>
			</li>
		)
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.active) {
			this.setState({
				index: -1
			})
		}
	}

	handleSubItemClick(index, event) {
		this.setState({
			index: this.state.index === index ? -1 : index
		})
	}

}


function SubItem(props) {
	const {path, parentPath} = props;

	return <li className={props.active?"active":""}>
		<Link to={path.startsWith('/')?path:`${parentPath}/${path}`} onClick={props.onSubItemClick}>
			{props.icon ? <i className={`fa ${props.icon}`}></i> : ""}
			<span>{props.title}</span>
		</Link>
	</li>
}
