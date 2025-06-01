// npm installs
import { styled } from '@mui/system';
import { Paper} from "@mui/material";

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const PostCard = styled('div')(({ theme }) => ({
    display:      'flex',
    width:        '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap:      'wrap',
      flexDirection: 'column',
    },
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Section = styled('div')(({ theme }) => ({
    borderRadius:   '20px',
    margin:         '10px',
    flex:            1,
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const ImgSection = styled('div')(({ theme }) => ({
    marginLeft:     '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    }
}));

/**
 *  styled html img, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Img = styled('img')(({ theme }) => ({
    borderRadius: '20px',
    objectFit:    'cover',
    width:        '100%',
    maxHeight:    '600px',
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Recommended = styled('div')(({ theme }) => ({
    display:      'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
}));

/**
 *  styled Paper, with embedded styles written in CSS-in-JS style.
 * 
 */
export const LoadingPaper = styled(Paper)(({ theme }) => ({
    display:        'flex',
    justifyContent: 'center',
    alignItems:     'center',
    padding:        '20px',
    borderRadius:   '15px',
    height:         '39vh',
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Outer = styled('div')(({ theme }) => ({
    display:        'flex',
    justifyContent: 'space-between',
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Inner = styled('div')(({ theme }) => ({
    height:         '200px',
    overflowY:      'auto',
    marginRight:    '30px',
}));

