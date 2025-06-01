// npm installs
import mongoose from "mongoose";


/** -------------------------------------------------------------------------------------------
 *  All Users schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function and create a new schema object.
const userSchema = mongoose.Schema({
    name:     { type: String, required: true },
    email:    { type: String, required: true },
    password: { type: String, required: true },
    id:       { type: String                 }
});

// create a model using schema definition.
const User = mongoose.model('User', userSchema);


// Default exports used because we are exporting a single primary Object from this module.
export default User;