


export default [
	{
		path: '/about',
		icon: 'fa-circle-o',
		title: 'About',
	},
	{
		path: '/dashboard',
		icon: 'fa-link',
		title: 'Dashboard',
	},{
		path: '/todoPage',
		icon: 'fa-link',
		title: 'todoDemo',
	},
	{
		path: '/inbox',
		icon: 'fa-circle-o',
		title: 'Inbox',
		children: [
			{
				path: 'messages/123',
				icon: 'fa-link',
				title: 'messages/123',
			},
			{
				path: 'messages/145',
				icon: 'fa-link',
				title: 'messages/145',
			},
		]
	}
]