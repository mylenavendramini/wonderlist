const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({ _id });
    if (!user) return res.status(401);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
  }
};

module.exports = authMiddleware;