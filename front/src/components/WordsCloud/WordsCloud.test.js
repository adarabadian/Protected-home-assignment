import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordsCloud from './WordsCloud';

describe('WordsCloud Component', () => {
	test('renders the component correctly', () => {
		render(<WordsCloud words={[{ value: 'React', count: 25 }]} />);
		expect(screen.getByText('Trending words')).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /trending words/i })).toBeInTheDocument();
		expect(screen.getByText('React')).toBeInTheDocument();
	});

	test('renders words passed via props', () => {
		const words = [
			{ value: 'React', count: 25 },
			{ value: 'JavaScript', count: 30 },
		];
		render(<WordsCloud words={words} />);
		expect(screen.getByText('React')).toBeInTheDocument();
		expect(screen.getByText('JavaScript')).toBeInTheDocument();
	});

	test('handles empty props gracefully', () => {
		render(<WordsCloud />);
		expect(screen.getByText('Trending words')).toBeInTheDocument();
		expect(screen.queryByText('React')).not.toBeInTheDocument();
	});
});
