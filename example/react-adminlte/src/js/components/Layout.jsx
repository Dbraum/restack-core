import React from 'react'

import Logo from './Logo'
import SidebarToggle from './SidebarToggle'
import SidebarMenu from './sidebarMenu/SidebarMenu.jsx'
import '../../assets/bootstrap/css/bootstrap.min.css'
import '../../assets/dist/css/font-awesome.min.css'
import '../../assets/dist/css/ionicons.min.css'
import '../../assets/dist/css/AdminLTE.min.css'
import '../../assets/dist/css/skins/skin-blue.min.css'
export default class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			height: 500
		}
	}

	componentDidMount() {
		//当页面加载后设置页面高度为全屏幕
		this.setState({
			height: window.innerHeight
		})
	}

	render() {
		return <div className="hold-transition skin-blue sidebar-mini">
			<div className="wrapper" style={{
				height:this.state.height
			}}>
				<header className="main-header">
					<Logo/>
					<SidebarToggle/>
				</header>
				<SidebarMenu menus={this.props.menus}/>

				<div className="content-wrapper">
					<section className="content-header">
						<h1>
							Page Header
							<small>Optional description</small>
						</h1>
						<ol className="breadcrumb">
							<li><a href="#"><i className="fa fa-dashboard"></i> Level</a></li>
							<li className="active">Here</li>
						</ol>
					</section>

					<section className="content">
						{this.props.children}
					</section>
				</div>
			</div>
		</div>
	}
}

