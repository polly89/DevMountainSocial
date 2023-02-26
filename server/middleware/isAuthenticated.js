require('dotenv').config();//This allows us to mport from the .env file
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const isAuthenticated = (req, res, next) => { // This is a middleware function that requests an object, a response, and a callback function "next" in the Express router. This callback kfunction executes the middlware. 
    const headerToken = req.get('Authorization');//This variable stores the resquest. 
    
    if (!headerToken) {
        console.log('ERROR IN auth middleware');
        res.sendStatus(401)
    }; // If there's no token, the system will send a 401 "Unauthorized" response.

    let token

    try {
        token = jwt.verify(headerToken, SECRET)
    } catch (err) {
        err.statusCode = 500
        throw err
    };

    if (!token) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401
        throw error
    }; // if there's no token, it will throw a 401 error to stats that it's not authorized. 

    next() //This passes control to the next middleware function
};
module.exports = {  // This allows us to export the function and make it available in other files
    isAuthenticated
}