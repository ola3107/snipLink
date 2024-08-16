import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import SignupModal from '../signup-modal';
import "@testing-library/jest-dom"
import { createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock("firebase/auth", () => ({
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn().mockReturnValue({
        currentUser: null,
    }),
}))

jest.mock("firebase/app", () => ({
    initializeApp: jest.fn(),
    getApps: jest.fn(() => []),
    getApp: jest.fn(() => ({
        name: "[DEFAULT]",
        options: {},
    }))
}))

jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn().mockReturnValue({}),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("SignUp Modal", () => {
    test("render email and password input field", () => {
        render(<SignupModal />)

        const openModalButton = screen.getByText("Sign up")
        expect(openModalButton).toBeInTheDocument()
        fireEvent.click(openModalButton)
        
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    })

    test("update email and password input fields", () => {
        render(<SignupModal />)
        const openModalButton = screen.getByText("Sign up")
        fireEvent.click(openModalButton)

        const emailInput = screen.getByLabelText(/Email/i)
        const PasswordInput = screen.getByLabelText(/Password/i)

        fireEvent.change(emailInput, {target: {value: "test@example.com"}})
        fireEvent.change(PasswordInput, {target: {value: "Password123"}})

        expect(emailInput).toHaveValue("test@example.com")
        expect(PasswordInput).toHaveValue("Password123")
    })

    test("displays an error message on failed login", async () => {
        const error = { code: "auth/email-already-in-use" };
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);
    
        render(<SignupModal />);
    
        const openModalButton = screen.getByText("Sign up")
        fireEvent.click(openModalButton)
    
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const signInButton = screen.getByRole("button", {name: /Sign Up/i} );
    
        fireEvent.change(emailInput, { target: { value: "Exist@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });
    
        fireEvent.click(signInButton);
    
        await waitFor(() =>
          expect(screen.getByText(/User with provided email already exist./i)).toBeInTheDocument()
        );
      });
})

