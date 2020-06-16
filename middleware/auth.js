const jwt = require('jsonwebtoken');
const config = require('../config.js');

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  console.log('asd', authorizationHeader);
  const authorizationToken = authorizationHeader.split(' ')[1];
  if (authorizationToken) {
    jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        req.authorId = decoded.id;
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'No token provided' });
  }
};

module.exports = isAuthenticated;
