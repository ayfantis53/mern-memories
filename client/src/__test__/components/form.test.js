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
import Form from '../../components/Form/Form';


const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/** ----------------------------------------------------------------------------------------
 *  Validate Form Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- memory-form.test.js render ---------------------|', () => {

    // -- Hook to render page before each test.
    beforeEach(async () => {
        const user = JSON.parse(localStorage.getItem('profile'));

        const mockFunction = jest.fn();

        // render page.
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <GoogleOAuthProvider clientId={google_client_id}>
                        <BrowserRouter>
                            <Form currentId={'currentId'} setCurrentId={mockFunction}/>
                        </BrowserRouter>
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </Provider>
        );

        /** provide an empty implementation for window.alert. */
        // remember the jsdom alert.
        window.alert = () => {}; 
    });


    // -- Validate page renders correctly.
    test('renders Form Memory page', () => {
        expect(screen.getByText("Please Sign in to create posts and see others posts")).toBeInTheDocument();
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', () => { 
        // Find input fields.
        const titleInputElement   = screen.getByRole('textbox', { name: 'Title' });
        const messageInputElement = screen.getByRole('textbox', { name: 'Message' });
        const tagsInputElement    = screen.getByRole('textbox', { name: 'Tags' });

        // Verify inputs are empty or properly initialized.
        expect(titleInputElement.value).toBe('');
        expect(messageInputElement.value).toBe('');
        expect(tagsInputElement.value).toBe('');
    });

    // -- Validate inputs to textFields populate correctly.
    test('Input populate correctly Memory form fields', () => {
        // Find input fields.
        const titleInputElement   = screen.getByRole('textbox', { name: 'Title' });
        const messageInputElement = screen.getByRole('textbox', { name: 'Message' });
        const tagsInputElement    = screen.getByRole('textbox', { name: 'Tags' });

        // Enter in a text.
        userEvent.type(titleInputElement,   "Title Test");
        userEvent.type(messageInputElement, "Message Test");
        userEvent.type(tagsInputElement,    "tag_test");

        // Verify that text showed up in input textbox.
        expect(titleInputElement.value).toBe('Title Test');
        expect(messageInputElement.value).toBe('Message Test');
        expect(tagsInputElement.value).toBe('tag_test');
    });

    // -- Add "Submit" button is responsive.
    test('Validate "Submit" button is being called when pressed', () => {
        // Mock onSubmit button.
        const handleSubmitMock = jest.fn();
        screen.getByTestId('memory-form').onsubmit = handleSubmitMock;

        // Select button.
        fireEvent.click(screen.getByRole("button", { name: "Submit" }));

        // Verify that button calls onsubmit.
        expect(handleSubmitMock).toHaveBeenCalled();
    });
  
});