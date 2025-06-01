// npm installs
import cors       from 'cors';
import dotenv     from 'dotenv';
import express    from 'express';
import mongoose   from 'mongoose';
import bodyParser from 'body-parser';

// project imports
import userRoutes from '../routes/user.routes.js';
import postRoutes from '../routes/posts.routes.js';


// returns an object of parsed .env file.
dotenv.config();

// inititalize express.
const app = express();

// middleware.
// CORS needs to be specified before routes.
app.use(cors()); 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// routes.
app.use('/api/user',  userRoutes);
app.use('/api/posts', postRoutes);

// set port env variables.
const port          = process.env.PORT || 5000;
const mongoAtlasURL = process.env.ATLAS_URI;

// connect app to port and mongo atlas database.
mongoose.connect(mongoAtlasURL)
    .then(() => app.listen(port, () => { console.log(`Server listening on port ${port}`); }))
    .catch((error) => console.log( error.message ));