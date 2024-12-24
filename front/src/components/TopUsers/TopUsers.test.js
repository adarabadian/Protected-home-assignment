import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopUsers from './TopUsers';

describe('TopUsers Component', () => {
	const users = [
		{ userId: 1, uniqueWordCount: 50 },
		{ userId: 2, uniqueWordCount: 40 },
		{ userId: 3, uniqueWordCount: 30 },
	];

	test('renders the component correctly', () => {
		render(<TopUsers users={users} />);
		expect(screen.getByText('Top Users')).toBeInTheDocument();
		expect(screen.getByText('User Id: 1')).toBeInTheDocument();
		expect(screen.getByText('User Id: 2')).toBeInTheDocument();
		expect(screen.getByText('User Id: 3')).toBeInTheDocument();
	});

	test('renders progress bars correctly', () => {
		render(<TopUsers users={users} />);

		expect(screen.getByText('50 unique words')).toBeInTheDocument();
		expect(screen.getByText('40 unique words')).toBeInTheDocument();
		expect(screen.getByText('30 unique words')).toBeInTheDocument();

		const maxWordCount = Math.max(...users.map(user => user.uniqueWordCount));
		expect(maxWordCount).toBe(50);

		const progressBars = screen.getAllByRole('progressbar');
		expect(progressBars).toHaveLength(users.length);
		expect(progressBars[0]).toHaveAttribute('aria-valuenow', '90');
		expect(progressBars[1]).toHaveAttribute('aria-valuenow', '72');
		expect(progressBars[2]).toHaveAttribute('aria-valuenow', '54');
	});

	test('handles empty users array gracefully', () => {
		render(<TopUsers users={[]} />);
		expect(screen.getByText('Top Users')).toBeInTheDocument();
		expect(screen.queryByText('User Id:')).not.toBeInTheDocument();
	});
});
