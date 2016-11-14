import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';


var products = [
	{
		id: 1,
		name: "Product1",
		price: 120
	},{
		id: 2,
		name: "Product2",
		price: 80
	},{
		id: 3,
		name: "Product3",
		price: 207
	},{
		id: 4,
		name: "Product4",
		price: 100
	},{
		id: 5,
		name: "Product5",
		price: 150
	},{
		id: 6,
		name: "Product1",
		price: 160
	}
];


export default class DatatableDemo extends Component {
	constructor(props) {
		super(props);


	}

	render() {
		return <div className="box">
			<div className="box-header">
				<h3 className="box-title">Datatable demo</h3>
			</div>
			<div className="box-body" style={{minHeight:300,maxHeight:450,overflow:'auto'}}>
				
			</div>
		</div>
	}
}
