import React, {Component, PropTypes} from 'react';


export default class InputComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		}
	}

	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== 13) {
			return;
		}

		event.preventDefault();

		var val = this.state.value.trim();

		if (val) {
			this.props.addItem(val)
			this.setState({value:''});
		}
	}

	render() {
		return <div className="input-group" style={{width:'100%'}}>
			<input className="form-control" onKeyDown={this.handleNewTodoKeyDown}
			       value={this.state.value}
			       onChange={event => this.setState({value:event.target.value})}/>
		</div>
	}
}


