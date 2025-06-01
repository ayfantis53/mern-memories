// npm installs
import { styled } from '@mui/system';
import { Paper } from '@mui/material';


/**
 *  styled Paper, with embedded styles written in CSS-in-JS style.
 * 
 */
export const PostContainer = styled(Paper)(({ theme }) => ({
    padding:         '15px',
}));

/**
 *  styled Paper, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Warning = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
}));


/**
 *  styled html form, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Form = styled('form')(({ theme }) => ({
    '& .MuiTextField-root': {
        margin:      '5px',
    },
    width:           '97%',
    margin:          '10px 0'
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const FileInput = styled('div')(({ theme }) => ({
    width: '97%',
    margin: '10px 0', 
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const SubmitBtn = styled('div')(({ theme }) => ({
    marginBottom: 10,
    marginTop: 13,
}));