/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Summary from './Summary';
import { fetchSummary } from '../../services/apiService';

jest.mock('../../services/apiService');

describe('Summary Component', () => {
	const mockSummary = {
		topUsers: [
			{ userId: 1, uniqueWordCount: 50 },
			{ userId: 2, uniqueWordCount: 40 },
			{ userId: 3, uniqueWordCount: 30 },
		],
		mostFrequentWords: [
			{ value: 'React', count: 25 },
			{ value: 'JavaScript', count: 20 },
			{ value: 'API', count: 15 },
		],
	};

	test('renders the loading spinner initially', () => {
		fetchSummary.mockResolvedValueOnce(mockSummary);
		render(<Summary />);
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	test('renders TopUsers and WordsCloud components after data is loaded', async () => {
		fetchSummary.mockResolvedValueOnce(mockSummary);
		render(<Summary />);

		await waitFor(() => {
			expect(screen.getByText('Summary')).toBeInTheDocument();
			expect(screen.getByText('User Id: 1')).toBeInTheDocument();
			expect(screen.getByText('React')).toBeInTheDocument();
		});
	});

	test('handles API errors gracefully', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
		fetchSummary.mockRejectedValueOnce(new Error('API Error'));

		render(<Summary />);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error fetching summary:', expect.any(Error));
			expect(screen.queryByText('User Id:')).not.toBeInTheDocument();
			expect(screen.queryByText('React')).not.toBeInTheDocument();
		});

		consoleSpy.mockRestore();
	});
});
