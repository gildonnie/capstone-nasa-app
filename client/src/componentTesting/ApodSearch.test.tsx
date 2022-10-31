/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Apod from '../pages/Apod';
import { store } from '../store';

test('includes a input field, search and reset button', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Apod />
      </BrowserRouter>
    </Provider>,
  );
  const resetButton = getByTestId('reset-button');
  const input = getByTestId('search');
  const searchButton = getByTestId('button');

  expect(input).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('input to have a type of email', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Apod />
      </BrowserRouter>
    </Provider>,
  );
  const input = screen.getByTestId('search');
  expect(input).toHaveAttribute('type', 'date');
});

test('pass a date string in the input', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Apod />
      </BrowserRouter>
    </Provider>,
  );
  const input = screen.getByTestId('search');
  userEvent.type(input, '2022-01-01');

  expect(screen.getByTestId('search')).toHaveValue('2022-01-01');
});

test('reset button should clear input field', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Apod />
      </BrowserRouter>
    </Provider>,
  );
  const input = screen.getByTestId('search');
  const resetButton = screen.getByTestId('reset-button');
  userEvent.type(input, '2022-01-01');

  expect(screen.getByTestId('search')).toHaveValue('2022-01-01');
  userEvent.click(resetButton);
  expect(input.textContent).toBe('');
});
