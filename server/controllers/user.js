const { User } = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'THIS_IS_THE_SECRET_123';

const create = async (req, res) => {
  const { password, email, userName } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ error: '409', message: 'User already exists.' });

  try {
    if (!password) throw new Error();
    if (!userName) throw new Error();
    if (!email) throw new Error();
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      ...req.body,
      password: hash,
    });
    const accessToken = jwt.sign({ _id: newUser._id }, SECRET_KEY);
    res.status(201).send({ accessToken, newUser });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).populate('travelCollections');
    const safeUser = {
      userName: user.userName,
      email: user.email
    }
    const validatedPass = await bcrypt.compare(password, user.password);

    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken, safeUser });
  } catch (error) {
    res.status(401)
      .send({ error: '401', message: 'Username or password is incorrect.' });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error, message: 'Page not found.' });
  }
};

const logout = async (req, res) => {

};

module.exports = { create, login, profile, logout };
