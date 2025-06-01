// npm installs
import express from 'express';

// project imports
import { signin, signup } from '../controllers/user.controller.js';


/** -------------------------------------------------------------------------------------------
 *  All routes for Users
 ** ----------------------------------------------------------------------------------------- */

// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// CREATE routes.
router.post('/signin', signin);
router.post('/signup', signup);


// Default exports used because we are exporting a single primary variable from this module.
export default router;