import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Layout from '../../components/Layout'


@connect(
	state => {
		console.info(state)
		return {
			menus: state.menus
		}
	},
	{}
)
export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Layout menus={this.props.menus}>
			{this.props.children}
		</Layout>
	}
}