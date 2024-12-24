import React from 'react';
import { LinearProgress } from '@mui/material';
import './TopUsers.scss';

export default function TopUsers(props) {
	const users = props.users || [];

	// no need useCallback / useMemo because this function is called only once.
	// moreover, it's only 3 users array.
	const maxWordCount = Math.max(...users.map((user) => user.uniqueWordCount), 0);

	return (
		<div className='top-users'>
			<h4>
				Top Users
			</h4>

			<div className='charts-container'>
				{users.map((user) => (
					<div key={user.userId} className="user-chart">
						<h5>
							User Id: {user.userId}
						</h5>
						<h6>
							{user.uniqueWordCount} unique words
						</h6>
						<LinearProgress
							variant="determinate"
							value={(user.uniqueWordCount / maxWordCount) * 90}
							sx={{
								height: 10,
								borderRadius: 5,
								backgroundColor: '#e0e0e0',
								'& .MuiLinearProgress-bar': {
									backgroundColor: '#0066c1',
								},
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
