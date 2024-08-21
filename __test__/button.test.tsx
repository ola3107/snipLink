import '@testing-library/jest-dom';
import {  render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("buttons", () => {
    it('render buttons', () => {
        render(<Home />)

        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(7)
    })
})