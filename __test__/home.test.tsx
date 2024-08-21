import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Home Page', () => {

  it('renders a input for shortLink', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Shorten a link here...');
    const nav = screen.getByRole('navigation')
    const main = screen.getByRole('main')
    expect(input).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
