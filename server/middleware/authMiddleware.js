// npm installs
import jwt from 'jsonwebtoken';


/**
 *  Secure routes by verifying user authentication and authorization
 * @param {*} req  The request object containing information about the incoming client request.
 * @param {*} res  The response object used to send responses back to the client.
 * @param {*} next A function to pass control to the next middleware function in the chain.
 * @return void
 */
const auth = async(req, res, next) => {
    try {
        // Get token from header, turn into array where Bearer is first item and token is second.
        const token = req.headers.authorization?.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            // Verify token.
            decodedData = jwt.verify(token, 'test');

            // Get user from token.
            req.userId = decodedData?.id;
        }
        else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        // Always call next at the end of a middleware function.
        next();
    } catch (error) {
        console.log(error);
    }
    
}


// Default exports used because we are exporting a single primary function from this module.
export default auth;