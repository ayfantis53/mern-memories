// npm installs
import { styled } from '@mui/system';
import { Link   } from 'react-router';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@mui/material';


/**
 *  styled NavBar, with embedded styles written in CSS-in-JS style.
 * 
 */
export const NavBar = styled(AppBar)(({ theme }) => ({
    borderRadius:    10,
    margin:         '30px 0',
    display:        'flex',
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    padding:        '10px 40px',
    position:       'static',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

/**
 *  styled Link, with embedded styles written in CSS-in-JS style.
 * 
 */
export const HomeLink = styled(Link)(({ theme }) => ({
    display:        'flex',
    alignItems:     'center',
}));

/**
 *  styled Toolbar, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Tools = styled(Toolbar)(({ theme }) => ({
    display:        'flex',
    justifyContent: 'flex-end',
    width:          '400px',
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
    }
}));

/**
 *  styled html img, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Img = styled('img')(({ theme }) => ({
    marginLeft:      '10px',
    marginTop:       '5px',
    height:          '42px'
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Div = styled('div')(({ theme }) => ({
    display:        'flex',
    justifyContent: 'space-between',
    width:          '320px',
    alignItems:     'center',
    [theme.breakpoints.down('sm')]: {
        width:          'auto',
        marginTop:       20,
        justifyContent: 'center',
    }
}));

/**
 *  styled Avatar, with embedded styles written in CSS-in-JS style.
 * 
 */
export const UserIcon = styled(Avatar)(({ theme }) => ({
    color:           theme.palette.main,
    backgroundColor: theme.palette.deepPurple500.main,
}));

/**
 *  styled Typography, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Username = styled(Typography)(({ theme }) => ({
    display:        'flex',
    alignItems:     'center',
    textAlign:      'center'
}));

/**
 *  styled Button, with embedded styles written in CSS-in-JS style.
 * 
 */
export const LogoutBtn = styled(Button)(({ theme }) => ({
    marginLeft:       '25px',
}));