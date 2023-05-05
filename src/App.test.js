import { render, screen } from '@testing-library/react';
import Testing from './components/Testing';

test('renders learn react link', () => {
  render(<Testing />);
  const linkElement = screen.getByText(/testing/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<Testing />);
  const listItems = screen.getAllByRole('listitem');
  // expect(listItems).toHaveLength(3);
  // expect(listItems.length).toBe(3);
  expect(listItems.length).toEqual(3);
});

test('renders title', () => {
  render(<Testing />);
  const title = screen.getByTestId('myname');
  expect(title).toBeInTheDocument();
});

test('sum should be 9', () => {
  render(<Testing />);
  const sum = screen.getByTitle('sum');
  expect(sum.textContent).toBe('9');
});

test('renders input field', () => {
  render(<Testing />);
  const userInput = screen.getByPlaceholderText('username');
  expect(userInput).toBeInTheDocument();
});
