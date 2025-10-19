// npm installs
import moment from 'moment';
import { useState    }    from 'react';
import { useDispatch }    from 'react-redux';
import { useNavigate }    from 'react-router';
import DeleteIcon         from '@mui/icons-material/Delete';
import MoreHorizIcon      from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon     from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { CardContent, Button, Typography } from '@mui/material';

// project imports
import * as Styled from './Post.styles';
import { deletePosts, likePosts } from '../../../actions/posts';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} post         post id.
 * @param {*} setCurrentId User id of logged in person.
 * @returns a post with all the data entered from a user in card format
 * ----------------------------------------------------------------------------------------*/
export default function Post({ post, setCurrentId }) {

  const dispatch           = useDispatch();
  const navigate           = useNavigate();
  const [likes, setLikes]  = useState(post?.likes);

  const user               = JSON.parse(localStorage.getItem('profile'));
  const userId             = user?.result.googleId || user?.result?._id;
  const hasLikedPost       = post.likes.find((like) => like === (userId));
  const backup             = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

  // navigate to all posts page.
  const openPosts = () => {
    navigate(`/posts/${post._id}`);
  };

  // Send like update to database, and update like state in page.
  const handleLike = async () => {
    dispatch(likePosts(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    }
    else {
      setLikes([ ...post.likes, userId]);
    }
  };

   // Rendering the likes to be highlighted or not based on if it was clicked by someone.
  const Likes = () => {
  if (likes.length > 0) {
    return likes.find((like) => like === userId)
      ? (
        <><ThumbUpAltIcon fontSize='small' /> &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` } </>
      ) : (
        <><ThumbUpAltOutlined fontSize='small' /> &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </>
      )
  }

    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>
  }
    
  return (
    <Styled.PostCard raised elevation={6}>
      {/** IMAGE IN CARD */}
      <Styled.PostMedia image={post.selectedFile || backup} title={post.title} onClick={openPosts} style={{cursor: 'pointer'}}/>
      {/** POST NAME AND DATE CREATED */}  
      <Styled.Overlay>
        <Typography variant='h6'> {post.name} </Typography>
        <Typography variant='body2'> {moment(post.createdAt).fromNow()} </Typography>
      </Styled.Overlay>
      {/** POST TITLE AND DATE CREATED */}
      { ((user?.result?.googleId === post?.creator) || (user?.result?._id === post?.creator)) && (
        <Styled.Overlay2 name='edit'>
          <Button style={{color:'white'}} size='small' onClick={() => {setCurrentId(post._id)}}>
            <MoreHorizIcon fontSize='default' />
          </Button>
        </Styled.Overlay2>
      )}
      {/** TAGS */}
      <Styled.Details>
        <Typography variant='body2' color='textSecondary'> {post.tags.map((tag)=>` #${tag}`)} </Typography>
      </Styled.Details>
      {/** POST TITLE */}
      <Styled.Title gutterBottom variant='h5' component='h2'> <u>{post.title}</u> </Styled.Title>
      {/** POST MESSAGE */}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'> {post.message.split(' ').splice(0, 20).join(' ')}... </Typography>
      </CardContent>
      {/** BUTTONS */}
      <Styled.PostActions>
        {/** POST LIKE BUTTON */}
        <Button size='small' color='primary' disabled={!user?.result} onClick={ handleLike }>
          <Likes />
        </Button>
        {/** POST DELETE BUTTON */}
        {( (user?.result?.googleId === post?.creator) || (user?.result?._id === post?.creator)) && (
          <Button size='small' color='secondary' onClick={ () => {dispatch(deletePosts(post._id, navigate))} }>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </Styled.PostActions>
    </Styled.PostCard>
    );
};
