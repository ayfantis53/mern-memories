// npm installs
import { useState, useRef } from 'react';
import { useDispatch      } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';

// project imports
import * as Styled from './PostDetails.styles';
import { commentPost } from '../../actions/posts';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} post the post id that this comment belongs to.
 * @returns the comments page of a post
 * ----------------------------------------------------------------------------------------*/
export default function CommentSection({ post }) {
    
    const commentsRef             = useRef();
    const dispatch                = useDispatch();
    const [comment, setComment]   = useState('');
    const [comments, setComments] = useState(post?.comments);
    const user                    = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async() => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);
        // scroll to new comment.
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <Styled.Outer>
            {/** EXISTING COMMENTS */}
            <Styled.Inner>
                <Typography gutterBottom variant='h6'><strong> Comments </strong></Typography>
                {comments.map((comment, i) => (
                    <Typography key={i} gutterBottom variant='subtitle1'>
                        <i><strong>- {comment.split(': ')[0]}</strong></i> : {comment.split(':')[1]}
                    </Typography>
                ))}
                {/** SCROLL TO NEW COMMENT */}
                <div ref={commentsRef} />
            </Styled.Inner>
            
            {/** NEW COMMENTS */}
            {user?.result?.name && (
                <div style={{width:'70%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField fullWidth rows={4} variant='outlined' label='Comment' multiline value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant='contained' onClick={handleClick} color='primary'>
                        Leave Comment
                    </Button>
                </div>
            )}
        </Styled.Outer>
    );
};