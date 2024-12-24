import React from 'react'
import { ToastContainer } from 'react-toastify';
import './MainPage.scss'
import Dashboard from '../../components/Dashboard/Dashboard';

export default function MainPage() {
	return (
		<div className='main-page'>
			<Dashboard />
			<ToastContainer />
		</div>
	)
}
