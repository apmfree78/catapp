import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import App from './App';

test('button should be rendered', () => {
  render(<App />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeInTheDocument();
});

test('img should be rendered', async () => {
  render(<App />);
  const image = screen.getByAltText('cute cat');
  await waitFor(() => expect(image).toHaveAttribute('src'));
});
