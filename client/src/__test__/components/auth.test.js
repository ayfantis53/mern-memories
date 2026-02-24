// npm installs
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router';
import { Provider            } from 'react-redux';
import { ThemeProvider       } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import userEvent         from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

// project imports
import { theme } from '../../theme';
import { store } from '../../app/store';
import Auth from '../../components/Auth/Auth';


const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/** ----------------------------------------------------------------------------------------
 *  Validate Auth Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- auth-form.test.js render ---------------------|', () => {

    // -- Hook to render page before each test.
    beforeEach(async () => {
        const user = JSON.parse(localStorage.getItem('profile'));

        // render page.
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <GoogleOAuthProvider clientId={google_client_id}>
                        <BrowserRouter>
                            <Auth/>
                        </BrowserRouter>
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </Provider>
        );

        /** provide an empty implementation for window.alert. */
        // remember the jsdom alert.
        jsdomAlert = window.alert; 
        window.alert = () => {}; 
    });

    // -- Hook to reset page after each test.
    afterEach(() => {
        // restore the jsdom alert.
        window.alert = jsdomAlert;
    });

    // -- Validate page renders correctly.
    test('renders Auth SignIn page', () => {
        expect(screen.getByText("Dont have an account? Sign Up")).toBeInTheDocument();
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', () => { 
        // Find input fields.
        const emailInputElement = screen.getByRole('textbox', { name: 'Email Address' });

        // Verify inputs are empty or properly initialized.
        expect(emailInputElement.value).toBe('');
    });

    // -- Validate inputs to textFields populate correctly.
    test('Input populate correctly Sign In fields', () => {
        // Find input fields.
        const emailInputElement = screen.getByRole('textbox', { name: 'Email Address' });

        // Enter in a text.
        userEvent.type(emailInputElement, "user0@example.com");

        // Verify that text showed up in input textbox.
        expect(emailInputElement.value).toBe("user0@example.com");
    });

    // -- Add "Sign In" button is responsive.
    test('Validate "Sign In" button is being called when pressed', () => {
        // Mock onSubmit button.
        const handleSignInMock = jest.fn();
        screen.getByTestId('signin-form').onsubmit = handleSignInMock;

        // Select button.
        fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

        // Verify that button calls onsubmit.
        expect(handleSignInMock).toHaveBeenCalled();
    });
  
});