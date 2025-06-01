// npm installs
import moment from 'moment';
import { useEffect                } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams   } from 'react-router';
import { Typography, Paper, CircularProgress, Divider } from "@mui/material";

// project imports
import * as Styled from './PostDetails.styles';
import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from '../../actions/posts';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns the details of a post
 * ----------------------------------------------------------------------------------------*/
export default function PostDetails() {

  const { id }                     = useParams();
  const dispatch                   = useDispatch();
  const navigate                   = useNavigate();
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post, dispatch]);

  if (!post) {
    return null;
  };

  if (isLoading) {
    return(
      <Styled.LoadingPaper elevation={6}>
        <CircularProgress size='7em'/>
      </Styled.LoadingPaper>
    );
  };

  const recommendedPosts = posts.filter(({ _id}) => _id !== post._id);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Styled.PostCard>
        <Styled.Section>
          {/** TITLE */}
          <Typography variant="h3" component="h2"> {post.title} </Typography>
          {/** TAGS */}
          <Typography variant="h7" component="h3" color="textSecondary" gutterBottom> {post.tags.map((tag) => `#${tag} `)} </Typography>
          {/** MESSAGE */}
          <Typography variant="body1" component="p" gutterBottom> {post.message} </Typography>
          {/** POST NAME */}
          <Typography variant="h6"> Created by: <i> {post.name} </i> </Typography>
          {/** DATE AND TIME CREATED */}
          <Typography variant="body1"> - {moment(post.createdAt).fromNow()}</Typography>

          {/** REALTIME CHAT DISCLAIMER */}
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong> Realtime Chat - coming soon! </strong></Typography>
          
          {/** COMMENTS */}
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </Styled.Section>

        {/** IMAGE */}
        <Styled.ImgSection>
          <Styled.Img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </Styled.ImgSection>
      </Styled.PostCard>

      {/** RECOMMENDED POSTS */}
      {!recommendedPosts.length && (
        <Styled.Section>
          <Typography gutterBottom variant="h5"> You might also like: </Typography>

          <Divider />

          <Styled.Recommended>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '10px', cursor: 'pointer', borderStyle:'groove', borderRadius:'15px', padding: '10px'}} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6"> {title} </Typography>
                <Typography gutterBottom variant="subtitle2"> <i>{name}</i> </Typography>
                <Typography gutterBottom variant="subtitle2"> {message} </Typography>
                <Typography gutterBottom variant="subtitle1"> <strong>Likes:</strong> {likes.length} </Typography>
                <img src={selectedFile} alt='memory.png' width="200px" />
              </div>
            ))}
          </Styled.Recommended>
        </Styled.Section>
      )}
    </Paper>
  );
};