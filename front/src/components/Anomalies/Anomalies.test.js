import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Anomalies from './Anomalies';
import { fetchAnomalies } from '../../services/apiService';

jest.mock('../../services/apiService');

describe('Anomalies Component', () => {
	const mockAnomalies = [
		{
			id: 1,
			userId: 101,
			title: 'Short title',
			body: 'This is a post body.',
			flags: { isShortTitle: true, isPostDuplicate: false, isCommonTitle: true },
		},
		{
			id: 2,
			userId: 102,
			title: 'Another post',
			body: 'Another body content.',
			flags: { isShortTitle: false, isPostDuplicate: true, isCommonTitle: false },
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders the component correctly', () => {
		render(<Anomalies />);
		expect(screen.getByText('Anomalies')).toBeInTheDocument();
		expect(screen.getByRole('grid')).toBeInTheDocument(); // DataGrid renders as a grid
	});

	test('displays loading spinner initially', () => {
		fetchAnomalies.mockResolvedValueOnce(mockAnomalies);
		render(<Anomalies />);
		expect(screen.getByRole('progressbar')).toBeInTheDocument(); // DataGrid shows loading spinner
	});

	test('renders rows after data is loaded', async () => {
		fetchAnomalies.mockResolvedValueOnce(mockAnomalies);
		render(<Anomalies />);

		await waitFor(() => {
			expect(screen.getByText('Short title')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByText('Another post')).toBeInTheDocument();
		});

		await waitFor(() => {
			const shortTitleFlag = screen.queryAllByText('✅').length;
			expect(shortTitleFlag).toBeGreaterThan(0); // Ensure at least one `✅` exists
		});

		await waitFor(() => {
			const duplicateFlag = screen.queryAllByText('❌').length;
			expect(duplicateFlag).toBeGreaterThan(0); // Ensure at least one `❌` exists
		});
	});

	test('handles API errors gracefully', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
		fetchAnomalies.mockRejectedValueOnce(new Error('API Error'));

		render(<Anomalies />);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error fetching anomalies:', expect.any(Error));
		});

		await waitFor(() => {
			expect(screen.queryByText('User Id:')).not.toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.queryByText('React')).not.toBeInTheDocument();
		});

		consoleSpy.mockRestore();
	});
});
