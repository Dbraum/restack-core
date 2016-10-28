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
			<div className="box-body" style={{minHeight:300}}>
				<ul className="nav nav-stacked">
					{this.props.todos.map((item,index)=><Item text={item} key={index}
					                                          index={index} removeItem={this.removeItem}/>)}
				</ul>
			</div>

			<div className="box-footer">
				<InputComponent addItem={this.addItem}/>
			</div>
		</div>
	}


	addItem = (item) =>{
		this.props.dispatch({
			type:'addTodoItem',
			payload:item
		})
	}

	removeItem = (index)=>{
		this.props.dispatch({
			type:'removeTodoItem',
			payload:index
		})
	}
}

function Item({text,removeItem,index}) {
	return <li>
		<a href="#" onClick={event => {removeItem(index)}}>{text} <span className="pull-right badge bg-red">X</span></a>
	</li>

}


function updateName(newName) {
	return {
		type: 'MY_REDUCER/UPDATE_NAME',
		payload: function (state) {
			console.info(state)
			return [].concat(state, [newName])
		}
	};
}

function updateNameWithSaga(newName) {
	return {
		type: 'addItemWithSaga',
		payload: newName
	};
}

