// npm installs
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector         } from 'react-redux';
import { useNavigate                      } from 'react-router';
import { ToastContainer, toast            } from 'react-toastify';
import { TextField, Typography, Button    } from "@mui/material";

import * as Styled from './Form.styles';
import { createPosts, updatePosts } from '../../actions/posts';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} param0 User id of logged in person.
 * @returns a form of adding a memory post to the database
 * ----------------------------------------------------------------------------------------*/
export default function Form({ currentId, setCurrentId }) {
  
  const imageRef                = useRef(null);
  const dispatch                = useDispatch();
  const navigate                = useNavigate();
  const user                    = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState({ title:'', message:'', tags:'', selectedFile:'' });

  const post = useSelector((state) => (
      currentId ? state.posts.posts.find((message) => 
          message._id === currentId
  ) : null));

  // Action to clear all entries in form by "clear" button.
  const clear = useCallback(() => {
    setCurrentId(0);
    setPostData({ title:'', message:'', tags:'', selectedFile:'' });

    // Clear the image data from the image input html.
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  }, [setCurrentId]);

  // Spawn all saved posts from database.
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
    if (!currentId) {
      clear();
    }
    // Have to set the current id to 0 or cant post anything since id initializes to null.
  }, [post, currentId, clear])

  // Handles submitting data user entered into form and putting it in database.
  const handleSubmit = (e) => {
    e.preventDefault();

    // required fields not entered error.
    if (postData.title === '' || postData.message === '') {
        toast.error('Enter in a title and message');
    }
    // Submission successful.
    else {
      if (currentId === 0) {
        // Gets name from local Storage that we set under profue when we log in and sets it as creator.
        dispatch(createPosts({ ...postData, name: user?.result?.name }, navigate));
      }
      else {
        // Gets name from local Storage that we set under profue when we log in and sets it as creator.
        dispatch(updatePosts(currentId, { ...postData, name: user?.result?.name  }));
      }   
  
      clear();
    }
  };

  // Handle image encoding to base64 to be uploaded to database.
  const handleImgUpload=(e)=>{
      const data = new FileReader();

      data.addEventListener('load',() => {
          setPostData({...postData, selectedFile: data.result})
      });

      data.readAsDataURL(e.target.files[0]);
    }

   // If not logged in Fome page doesnt load but this disclaimer page loads instead.
  if (!user?.result?.name) {
    return (
      
       /** PAGE WITH TEXT */
      <Styled.Warning style={{ padding: '40px 10px', margin: '5px 0'}}>
        <Typography variant="h6" align="center">
          Please Sign in to create posts and see others posts
        </Typography>
      </Styled.Warning>
    )
  }

  return (
    <>
      <Styled.PostContainer elevation={6}>
        {/* FORM TO SUBMIT A NEW POST */}
        <Styled.Form autoComplete='off' noValidate onSubmit={handleSubmit} action="">
          {/* FORM TITLE */}
          <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Memory </Typography>
          {/* TITLE INPUT */}
          <TextField name = "title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>{setPostData({...postData, title: e.target.value})}}/>
          {/* MESSAGE INPUT */}
          <TextField name = "message" variant="outlined" label="Message" multiline rows={3} fullWidth value={postData.message} onChange={(e)=>{setPostData({...postData, message: e.target.value})}}/>
          {/* TAGS INPUT */}
          <TextField name = "tags" variant="outlined" label="Tags (comma seperated)" fullWidth value={postData.tags} onChange={(e)=>{setPostData({...postData, tags: e.target.value.split(',')})}}/>
          {/** PICTURE INPUT ..UPLOADING FILES */}
          <Styled.FileInput>
              <input ref={imageRef} type='file' onChange={handleImgUpload} />
              {/** DONT RENDER ANYTHING IF NO IMAGE HAS BEEN UPLOADED */}
              {postData.selectedFile.length > 0 ? (
                <img src={postData.selectedFile} height="20px" width="20px" style={{marginTop:'3%',}} alt={postData.selectedFile} />
              ) :  (
                <p>   </p>
              )}
            {/** SUBMIT BUTTON */}
            <Styled.SubmitBtn>
              <Button variant="contained" color="primary" size="large" type="submit" fullWidth> Submit </Button>
            </Styled.SubmitBtn>
            {/** CLEAR BUTTON */}
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth> Clear </Button>
          </Styled.FileInput>
        {/* FORM TO SUBMIT A NEW POST */}
        </Styled.Form>
      </Styled.PostContainer>

      {/** POPUP MESSAGE ALERT */}
      <ToastContainer />
    </>
    );
};