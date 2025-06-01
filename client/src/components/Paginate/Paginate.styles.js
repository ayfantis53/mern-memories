// npm installs
import { styled } from '@mui/system';
import { Pagination } from '@mui/material';

/**
 *  styled Grid, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Pages = styled(Pagination)(({ theme }) => ({
    justifyContent: "space-around",
}));

