import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputField from './';

const inputProps = {
  name: 'author',
  type: 'text',
  label: 'Author',
  disabled: 'disabled',
  error: { author: 'This field is required', body: 'This field is required' },
};

it('renders correctly', () => {
  const { queryByTestId } = render(<InputField {...inputProps} />);
  expect(queryByTestId('error-msg')).toBeTruthy();
});
