import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAnomalies } from '../../services/apiService';
import './Anomalies.scss';

export default function Anomalies() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAnomaliesOnLoad();
	}, []);

	const getAnomaliesOnLoad = async () => {
		try {
			setLoading(true);
			const anomalies = await fetchAnomalies();

			const formattedRows = anomalies.map((anomaly) => ({
				id: anomaly.id,
				userId: anomaly.userId,
				title: anomaly.title,
				body: anomaly.body,
				isShortTitle: anomaly.flags?.isShortTitle,
				isPostDuplicate: anomaly.flags?.isPostDuplicate,
				isCommonTitle: anomaly.flags?.isCommonTitle,
			}));

			setRows(formattedRows);
		} catch (error) {
			console.error('Error fetching anomalies:', error);
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{ field: 'id', headerName: 'Post Id', align: 'center', headerAlign: 'center', flex: .5 },
		{ field: 'userId', headerName: 'User Id', align: 'center', headerAlign: 'center', flex: .5 },
		{ field: 'title', headerName: 'Title', headerAlign: 'center', flex: 1 },
		{ field: 'body', headerName: 'Body', headerAlign: 'center', flex: 3 },
		{
			field: 'isShortTitle', headerName: 'Short', flex: .6, headerAlign: 'center', align: 'center',
			description: 'Title is less than 15 characters',
			renderCell: (params) => (params.value ? '✅' : '❌'),
		},
		{
			field: 'isPostDuplicate', headerName: 'Duplicate', flex: .6, headerAlign: 'center', align: 'center',
			description: 'The user already posted a similar post',
			renderCell: (params) => (params.value ? '✅' : '❌'),
		},
		{
			field: 'isCommonTitle', headerName: 'Spam', flex: .6, headerAlign: 'center', align: 'center',
			description: 'Title is common among other posts, possibly spam',
			renderCell: (params) => (params.value ? '✅' : '❌'),
		},
	];

	return (
		<div className="anomalies">
			<h2>Anomalies</h2>

			<div className='table-container'>
				<DataGrid
					rows={rows}
					columns={columns}
					loading={loading}
					pageSize={10}
					rowsPerPageOptions={[10, 20, 50]}
					disableSelectionOnClick
					style={{ height: '100%', width: '100%' }}
					disableColumnResize={true}
				/>
			</div>
		</div>
	);
}
