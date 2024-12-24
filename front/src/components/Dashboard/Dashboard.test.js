/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import Anomalies from '../Anomalies/Anomalies';
import Summary from '../Summary/Summary';

jest.mock('../Anomalies/Anomalies', () => () => <div data-testid="anomalies-component">Anomalies Component</div>);
jest.mock('../Summary/Summary', () => () => <div data-testid="summary-component">Summary Component</div>);

describe('Dashboard Component', () => {
  test('renders the main elements', () => {
    render(<Dashboard />);
    expect(screen.getByText('Protected Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome to your dashboard!')).toBeInTheDocument();
  });

  test('renders the Anomalies and Summary components', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('anomalies-component')).toBeInTheDocument();
    expect(screen.getByTestId('summary-component')).toBeInTheDocument();
  });
});
