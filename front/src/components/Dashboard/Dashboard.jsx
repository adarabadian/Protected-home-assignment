import React from 'react'
import Anomalies from '../Anomalies/Anomalies'
import './Dashboard.scss'
import Summary from '../Summary/Summary'

export default function Dashboard() {
	return (
		<div className='dashboard'>
			<h1>Protected Dashboard</h1>
			<h3>Welcome to your dashboard!</h3>

			<div className='side-by-side'>
				<Anomalies />
				<Summary />
			</div>
		</div>
	)
}
