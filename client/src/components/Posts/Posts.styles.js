// npm installs
import { styled } from '@mui/system';
import { Grid   } from '@mui/material';


/**
 *  styled Grid, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Posts = styled(Grid)(({ theme }) => ({
    display:    'flex',
    alignItems: 'stretch',
}));

