import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Repository from '../pages/Repository'
import User from '../pages/User'

const Routes: React.FC = () => (
	<Switch>
		<Route path="/" exact component={Dashboard} />
		<Route path="/user/:user/" exact component={User} />
		<Route
			path="/repository/:user/:repository"
			exact
			component={Repository}
		/>
	</Switch>
)

export default Routes
