import React from 'react'
import './App.css'
import { Route, Switch, Redirect, HashRouter as Router } from 'react-router-dom'
import OverviewWrap from './Components/SchoolDetail/Overview.js'
import Curriculum from './Components/SchoolDetail/Curriculum.js'
import TheTeam from './Components/SchoolDetail/TheTeam'
// import Enrolment from './Components/SchoolDetail/Enrolment'
import Dashboard from './Components/Layout/Dashborad.js'
import './sass/style.scss'

function App() {
	return (
		<div className="App">
			<Router>
				<Dashboard>
					{/* <OverviewWrap /> */}
					<Switch>
						<Route
							exact
							path="/school/:schoolId(\d+)/"
							component={OverviewWrap}
						/>
						<Route
							exact
							path="/school/:schoolId(\d+)/curriculum"
							component={Curriculum}
						/>
						<Route
							exact
							path="/school/:schoolId(\d+)/team"
							component={TheTeam}
						/>
						{/* <Route
							exact
							path="/school/:schoolId(\d+)/enrolment"
							component={Enrolment}
						/> */}
						{/* <Route exact path='/students/:id(\d+|create)' component={StudentDetails} />
							<Route exact path='/lecturers/:id(\d+|create)' component={LecturerDetails} />
							<Route path='*' component={NotFound}/> */}
					</Switch>
				</Dashboard>
			</Router>
		</div>
	)
}

export default App
