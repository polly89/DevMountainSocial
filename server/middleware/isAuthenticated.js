require('dotenv').config() // This allows us to inport from the .env file
const jwt = require('jsonwebtoken')
const {SECRET} = process.env 

module.exports = { // this exports the functions and makes thm available in other files
    isAuthenticated: (req, res, next) => { 
        //This is a middeware function that requests an object, a response and a callback function "next" in the Express router. This callback function executes the middleware. 
        const headerToken = req.get('Authorization')
        // This is a variable to store the request.
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        // If there's no token send a status 401 which is an unauthorized response

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        // If there's no token, throw a 401 to state that it's unathorized.

        next()
        //This passescontrol to the next middleware function. 
    }
}