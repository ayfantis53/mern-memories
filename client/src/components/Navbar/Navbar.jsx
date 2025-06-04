import { useState, useEffect, useCallback      } from 'react';
import { jwtDecode                             } from 'jwt-decode';
import { useDispatch                           } from 'react-redux';
import { useNavigate, useLocation              } from 'react-router';
import { Button                                } from '@mui/material';

import * as Styled from './Navbar.styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns the header with links to authentication and home
 * ----------------------------------------------------------------------------------------*/
export default function Navbar() {
    
    const dispatch        = useDispatch();
    const navigate        = useNavigate();
    const location        = useLocation();
    const [user, setUser] = useState(() => {
                                try {
                                const storedProfile = localStorage.getItem('profile');
                                return storedProfile ? JSON.parse(storedProfile) : null;
                                } catch (error) {
                                console.error('Error parsing profile from localStorage:', error);
                                return null;
                                }
                            });
    
    // Navigate to login page, delete user cookie.
    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/auth');
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) { 
                logout();
            }
          }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token])

    return (
        <Styled.NavBar color='inherit' >
            {/** HOME PAGE BUTTON LINK AND SITE LOGO */}
            <Styled.HomeLink to='/'>
                <Styled.Img src={memoriesText} alt='Memories'/>
                <Styled.Img src={memoriesLogo} alt='icon'    />
            </Styled.HomeLink>
            {/** USERNAME LOGO AND USER LOGO & SIGN IN/OUT BUTTON */}
            <Styled.Tools>
                {user ? (
                    <Styled.Div>
                        {/** FIRST INITIAL AVATAR LOGO */}
                        <Styled.UserIcon alt={user?.result.name} src={user?.result.imageUrl}> {user.result.name.charAt(0)} </Styled.UserIcon>
                        {/** USERNAME */}
                        <Styled.Username variant='h6'> {user?.result.name} </Styled.Username>
                        {/** LOGOUT BUTTON */}
                        <Styled.LogoutBtn variant='contained' color='secondary' onClick={logout}> Logout </Styled.LogoutBtn>
                    </Styled.Div>
                ) : (
                    /** SIGN IN BUTTON */
                    <Button component={Styled.HomeLink} to='/auth' variant='contained' color='primary'> Sign In </Button>
                )}
            </Styled.Tools>
        </Styled.NavBar>
    );
};