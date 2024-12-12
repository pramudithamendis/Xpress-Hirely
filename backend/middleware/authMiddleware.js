const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

//MIDDLEWARE Functions
const authenticateUser = async (req, res, next) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization.split(' ')[1];
  
      // Verify the token
      const decodedToken = jwt.verify(token, 'secretkey123');
  
      // Check if a user exists with the decoded token's ID
      const user = await User.findById(decodedToken._id);
      if (!user) {
        throw new Error('User not found');
      }
 // Attach the user object to the request for further use
 req.user = user;

 // Proceed to the next middleware/route handler
 next();
} catch (error) {
 // Handle authentication errors
 next(new createError.Unauthorized('Unauthorized'));
}
};
const authenticateAdmin = async (req, res, next) => {
    try {
      // Ensure the user is authenticated first
      await authenticateUser(req, res, async () => {
        // Check if the user is an admin
        if (req.user.role === 'admin') {
          // Proceed to the next middleware/route handler
          next();
        } else {
          // User is not an admin, throw an error
          throw new Error('User is not an admin');
        }
      });
    } catch (error) {
      // Handle authorization errors
      next(new createError.Forbidden('Forbidden'));
    }
  };

  module.exports = { authenticateUser, authenticateAdmin };