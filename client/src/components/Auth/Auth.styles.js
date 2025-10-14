// npm installs
import { styled } from '@mui/system';
import { Avatar, Paper, Button, Container } from "@mui/material";


/**
 *  styled Container, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Root = styled(Container)(({ theme }) => ({
    '& .MuiTextField-root': {
        margin: theme.spacing(0.5),
    },
}));

/**
 *  styled Paper, with embedded styles written in CSS-in-JS style.
 * 
 */
export const PostPaper = styled(Paper)(({ theme }) => ({
    marginTop:       theme.spacing(8),
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    padding:         theme.spacing(2),
}));

/**
 *  styled Avatar, with embedded styles written in CSS-in-JS style.
 * 
 */
export const LockIcon = styled(Avatar)(({ theme }) => ({
    margin:          theme.spacing(1),
    backgroundColor: theme.palette.deepPurple500.main,
}));

/**
 *  styled html form, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Form = styled('form')(({ theme }) => ({
    width:           '100%',
    marginTop:       theme.spacing(2),
}));

/**
 *  styled Button, with embedded styles written in CSS-in-JS style.
 * 
 */
export const GoogleBtn = styled(Button)(({ theme }) => ({
    marginBottom:    theme.spacing(2),
}));

/**
 *  styled Button, with embedded styles written in CSS-in-JS style.
 * 
 */
export const SubmitBtn = styled(Button)(({ theme }) => ({
     margin:          theme.spacing(3, 0, 2),
}));


