// npm installs
import { styled } from '@mui/system';
import { AppBar, Grid, Paper } from '@mui/material';


/**
 *  styled Grid, with embedded styles written in CSS-in-JS style.
 * 
 */
export const HomeGrid = styled(Grid)(({ theme }) => ({
    alignItems:     'stretch',
    flexDirection:  'row',
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
    },
     [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

/**
 *  styled AppBar, with embedded styles written in CSS-in-JS style.
 * 
 */
export const SearchBar = styled(AppBar)(({ theme }) => ({
    '& .MuiTextField-root': {
            margin:      '5px',
    },
    borderRadius:    4,
    marginBottom:   '1rem',
    display:        'flex',
    padding:        '15px',
    position:       'static'
}));

/**
 *  styled Paper, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Pagination = styled(Paper)(({ theme }) => ({
    borderRadius:    4,
    marginTop:      '1rem',
    padding:        '16px',
    display:        'flex',
    justifyContent: 'space-evenly'
}));