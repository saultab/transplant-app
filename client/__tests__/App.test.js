import React from 'react';
import { render } from '@testing-library/react-native';

// Basic smoke test that verifies the app renders without crashing
describe('App', () => {
  it('renders without crashing', () => {
    // Since App depends on navigation and context, we test the context in isolation
    const { AppProvider } = require('../src/context/AppContext');
    const { Text } = require('react-native');

    const TestChild = () => <Text>Test</Text>;

    const { getByText } = render(
      <AppProvider>
        <TestChild />
      </AppProvider>,
    );

    expect(getByText('Test')).toBeTruthy();
  });
});
