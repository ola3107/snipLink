import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import LoginModal from '../login-modal';
import '@testing-library/jest-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "next/navigation";

jest.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn().mockReturnValue({
        currentUser: null,
    }),
}));

jest.mock("firebase/app", () => ({
    initializeApp: jest.fn(),
    getApps: jest.fn(() => []),
    getApp: jest.fn(() => ({
        name: "[DEFAULT]",
        options: {},
    })),
}));

jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn().mockReturnValue({}),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe('Login Modal', () => {
   const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

   test("renders email and password input fields", () => {
    render(<LoginModal text="Login" />);
    const openModalButton = screen.getByText("Login");
    fireEvent.click(openModalButton);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("update email and password input fields", () => {
    render(<LoginModal text="Login" />);
    const openModalButton = screen.getByText("Login");
    fireEvent.click(openModalButton);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");

  });

  test("displays an error message on failed login", async () => {
    const error = { code: "auth/invalid-credential" };
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);

    render(<LoginModal text="Login" />);

    const openModalButton = screen.getByText("Login")
    fireEvent.click(openModalButton)

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/Sign in/i);

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(signInButton);

    await waitFor(() =>
      expect(screen.getByText(/incorrect email or password/i)).toBeInTheDocument()
    );
  });

  test("navigates to dashboard on successful login", async () => {
    const user = { uid: "123" };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user });

    render(<LoginModal text="Login" />);
    const openModalButton = screen.getByText("Login")
    fireEvent.click(openModalButton)

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/Sign in/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(signInButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });
})
