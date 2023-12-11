// MainNavigation.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter is used for testing with react-router-dom
import MainNavigation from './MainNavigation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual Link component
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

test('renders MainNavigation correctly', () => {
  render(
    <MemoryRouter>
      <MainNavigation />
    </MemoryRouter>
  );

  // Use Jest's snapshot testing to ensure the rendered component structure remains consistent
  expect(screen.getByTestId('main-navigation')).toMatchSnapshot();
});
