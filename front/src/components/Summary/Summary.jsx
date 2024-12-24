import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { fetchSummary } from '../../services/apiService';
import WordsCloud from '../WordsCloud/WordsCloud';
import TopUsers from '../TopUsers/TopUsers';
import './Summary.scss';

export default function Summary() {
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		getSummaryOnLoad();
	}, []);

	const getSummaryOnLoad = async () => {
		setLoading(true); // Set loading to true while fetching
		try {
			const summary = await fetchSummary();
			setSummary(summary);
		} catch (error) {
			console.error('Error fetching summary:', error);
		} finally {
			setLoading(false); // Stop loading regardless of success or failure
		}
	};

	return (
		<div className="summary">
			<h2>Summary</h2>

			{loading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '300px',
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<>
					<TopUsers users={summary?.topUsers} />
					<WordsCloud words={summary?.mostFrequentWords} />
				</>
			)}
		</div>
	);
}
