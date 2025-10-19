// npm installs
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Provider            } from 'react-redux';
import { ThemeProvider       } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

// project imports
import App from '../App';
import { store } from '../app/store';
import { theme } from '../theme';

const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/** ----------------------------------------------------------------------------------------
 *  Validate App rendering
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- App.test.js ---------------------|',() => {
  test('renders default page', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId={google_client_id}>
            <App />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText(/No Posts/i)).toBeInTheDocument();
  });
});