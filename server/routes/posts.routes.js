// npm installs
import express from 'express';

// project imports
import auth from '../middleware/authMiddleware.js';
import { getPost, 
         getPosts, 
         createPosts, 
         getPostsBySearch, 
         updatePosts, 
         deletePosts, 
         likePosts, 
         commentPost } from '../controllers/posts.controller.js';


/** -------------------------------------------------------------------------------------------
 *  All routes for Posts
 ** ----------------------------------------------------------------------------------------- */

// Routes with :id need to be placed after routes with no :id in them.
// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// CREATE routes.
router.post('/',                auth, createPosts);

// READ routes.
router.get('/search',           getPostsBySearch );
router.get('/',                 getPosts         );
router.get('/:id',              getPost          );

// UPDATE id routes
router.patch('/:id',            auth, updatePosts);
// DELETE id routes.
router.delete('/:id',           auth, deletePosts);
// UPDATE id routes.
router.patch('/:id/likePost',   auth, likePosts  );
// CREATE id routes.
router.post('/:id/commentPost', auth, commentPost);


// Default export because we are exporting a single primary variable from this module.
export default router;