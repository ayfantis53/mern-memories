// npm installs
import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, compose } from 'redux';
import { thunk                    } from 'redux-thunk';
import { Provider                 } from 'react-redux';
import { ThemeProvider            } from '@mui/material';
import { configureStore           } from '@reduxjs/toolkit';
import { GoogleOAuthProvider      } from '@react-oauth/google';


// project imports
import './index.css';
import App       from './App';
import { theme } from './theme';
import reducers  from './reducers/reducer';
import reportWebVitals from './reportWebVitals';


const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const store            = configureStore({reducer: reducers}, compose(applyMiddleware(thunk)));
const root             = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={google_client_id}>
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();