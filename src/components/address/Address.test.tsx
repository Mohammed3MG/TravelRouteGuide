// Address.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Address from './Address';

// Mock the Redux store
const mockStore = configureStore([]);
const store = mockStore({}); // Provide an initial state if needed

const mockAddress = {
  id: '1',
  address: '123 Main St',
  clicked: false,
  lat: 40.7128,
  lng: -74.006,
};
test('renders Address component correctly', () => {
    render(
      <Provider store={store}>
        <table>
          <tbody>
            <Address address={mockAddress} mapPage={false} index={1} />
          </tbody>
        </table>
      </Provider>
    );
  
  });

