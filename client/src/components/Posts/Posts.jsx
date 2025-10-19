// npm installs
import { useSelector            } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

// project imports
import Post      from "./Post/Post";
import * as Styled from './Posts.styles';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} setCurrentId New user id of logged in person.
 * @returns a list of every post
 * ----------------------------------------------------------------------------------------*/
export default function Posts({ setCurrentId }) {

    const { posts, isLoading } = useSelector((state) => state.posts);
    
    if (!posts.length && isLoading) {
        return 'No Posts'
    }

    return (
        /** IF LOADING DISPLAY CIRCLE ANIMATION */
        isLoading ? <CircularProgress /> : (
            /** GRID DISPLAY OF ALL POSTS */
            <Styled.Posts container spacing={3} >
                {posts.map((post) => (
                    <Grid key={post._id} sx={{ width: {xs: '100%',  sm: '100%', md: '30%'}}} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Styled.Posts>
        )
    );
};