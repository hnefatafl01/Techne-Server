const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = {
  createJWT: function(user){
    const jwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email
    }
    return jwt.sign(jwtPayload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  },
  decodeJWT: function(token){
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }
}
