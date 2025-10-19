// npm installs
import { styled } from '@mui/system';
import { Card, CardActions, CardMedia, Typography } from '@mui/material';


/**
 *  styled Card, with embedded styles written in CSS-in-JS style.
 * 
 */
export const PostCard = styled(Card)(({ theme }) => ({
    display:             'flex',
    flexDirection:       'column',
    justifyContent:      'space-between',
    borderRadius:        '15px',
    height:              '100%',
    position:            'relative',
}));

/**
 *  styled Card, with embedded styles written in CSS-in-JS style.
 * 
 */
export const PostMedia = styled(CardMedia)(({ theme }) => ({
    height:               0,
    paddingTop:          '56.25%',
    backgroundColor:     'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Overlay = styled('div')(({ theme }) => ({
    position:            'absolute',
    top:                 '20px',
    left:                '20px',
    color:               'white',
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Details = styled('div')(({ theme }) => ({
    display:             'flex',
    justifyContent:      'space-between',
    margin:              '20px',
}));

/**
 *  styled Typography, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Title = styled(Typography)(({ theme }) => ({
    padding:             '0 16px',
}));

/**
 *  styled CardActions, with embedded styles written in CSS-in-JS style.
 * 
 */
export const PostActions = styled(CardActions)(({ theme }) => ({
    padding:             '0 16px 8px 16px',
    display:             'flex',
    justifyContent:      'space-between',
}));

/**
 *  styled html div, with embedded styles written in CSS-in-JS style.
 * 
 */
export const Overlay2 = styled('div')(({ theme }) => ({
    position:            'absolute',
    top:                 '20px',
    right:               '20px',
    color:               'white',
}));

