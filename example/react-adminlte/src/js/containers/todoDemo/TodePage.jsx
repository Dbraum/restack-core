import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import InputComponent from './InputComponent';

@connect(
	state => {
		return {
			todos: state.todos
		}
	}
)
export default class MenuDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [
				'Projects', 'Tasks', 'Completed Projects', 'Followers'
			]
		}
	}

	render() {
		return <div className="box">
			<div className="box-header">
				<h3 className="box-title">todo demo</h3>
			</div>
			<div className="box-body" style={{minHeight:300,maxHeight:450,overflow:'auto'}}>
				<ul className="nav nav-stacked">
					{this.props.todos.map((item, index)=><Item text={item} key={index}
					                                           index={index} removeItem={this.removeItem}/>)}
				</ul>
			</div>

			<div className="box-footer">
				<InputComponent addItem={this.addItem}/>
			</div>
		</div>
	}


	addItem = (item) => {
		this.props.dispatch({
			type: 'addTodoItem2',
			payload: item
		})
	}

	removeItem = (index)=> {
		this.props.dispatch({
			type: 'removeTodoItem',
			payload: index
		})
	}
}

function Item({text, removeItem, index}) {
	function handleClick(event) {
		event.preventDefault();
		removeItem(index)
	}

	return <li>
		<a href="#" onClick={handleClick}>
			<span className="pull-left">{index} |</span>
			<span style={{padding:'0px 15px'}}>{text}</span>
			<span className="pull-right badge bg-red">X</span>
		</a>
	</li>
}

