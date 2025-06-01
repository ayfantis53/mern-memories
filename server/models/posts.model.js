// npm installs
import mongoose from "mongoose";


/** -------------------------------------------------------------------------------------------
 *  All Posts schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function and create a new schema object.
const postSchema = mongoose.Schema({
    title:        String,
    message:      String,
    name:         String,
    creator:      String,
    tags:         [String],
    selectedFile: String,
    likes:        { type: [String], default: []     },
    comments:     { type: [String], default: []     },
    createdAt:    { type: Date, default: new Date() },
});

// create a model using schema definition.
const PostMessage = mongoose.model('PostMessage', postSchema);


// Default exports used because we are exporting a single primary Object from this module.
export default PostMessage;