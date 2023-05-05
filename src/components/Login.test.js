import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

jest.mock('axios', () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: 'john' },
    }),
  },
}));

test('username input should be rendered', () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
});

test('password input should be rendered', () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test('button should be rendered', () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeInTheDocument();
});

test('username input should be empty', () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe('');
});

test('password input should be empty', () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe('');
});

test('button should be disabled', () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeDisabled();
});

test('loading should not be rendered', () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test('error message should not be visible', () => {
  render(<Login />);
  const errorEl = screen.getByTestId('error');
  expect(errorEl).not.toBeVisible();
});

test('username input should change', () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const usernameValue = 'test';
  fireEvent.change(usernameInputEl, { target: { value: usernameValue } });
  expect(usernameInputEl.value).toBe(usernameValue);
});

test('password input should change', () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const passwordValue = 'test';
  fireEvent.change(passwordInputEl, { target: { value: passwordValue } });
  expect(passwordInputEl.value).toBe(passwordValue);
});

test('button should not be disabled when inputs exists', () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');

  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const inputsValue = 'test';

  fireEvent.change(passwordInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.change(usernameInputEl, {
    target: { value: inputsValue },
  });

  expect(buttonEl).not.toBeDisabled();
});

test('loading should be rendered', () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');

  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const inputsValue = 'test';

  fireEvent.change(passwordInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.change(usernameInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test('loading should be rendered after fetching', async () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');

  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const inputsValue = 'test';

  fireEvent.change(passwordInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.change(usernameInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test('user should be rendered after fetching', async () => {
  render(<Login />);
  const buttonEl = screen.getByRole('button');

  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const inputsValue = 'test';

  fireEvent.change(passwordInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.change(usernameInputEl, {
    target: { value: inputsValue },
  });

  fireEvent.click(buttonEl);

  const userItem = await screen.findByText('john'); //we cannot use getByText because it is an async query

  expect(userItem).toBeInTheDocument();
});
