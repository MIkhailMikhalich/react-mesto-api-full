const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const objectId = require('mongodb').ObjectID;
const User = require('../models/user.js');
const NotFound = require('../errors/not-found-err.js');
const AlreadyExsists = require('../errors/already-exists.js');
const IncorrectAuthData = require('../errors/incorrect-auth-data.js');
const IncorrectData = require('../errors/incorrect-data.js');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  if (!req.params.id || !objectId.isValid(req.params.id)) throw new IncorrectData('Переданы некорректные данные');
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw new NotFound('Данный пользоватьель не найден');
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) throw new IncorrectData('Переданы некорректные данные');
  if (!req.user._id || !objectId.isValid(req.user._id)) throw new IncorrectData('Переданы некорректные данные');
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFound('Данный пользоватьель не найден');
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const regex = /(http|https)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?([a-zA-Z0-9\-\?\,\'\/\+&%\$#_]+)/gim;
  const { avatar } = req.body;
  if (avatar === undefined || !regex.test(avatar)) throw new IncorrectData('Переданы некорректные данные');
  if (!req.user._id || !objectId.isValid(req.user._id)) throw new IncorrectData('Переданы некорректные данные');
  User.findByIdAndUpdate(req.user._id, { avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFound('Данный пользоватьель не найден');
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  if (!req.user._id || !objectId.isValid(req.user._id)) throw new IncorrectData('Переданы некорректные данные');
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFound('Данный пользоватьель не найден');
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        if (!user) throw new IncorrectAuthData('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new IncorrectAuthData('Неправильные почта или пароль');
          }
          res
            .cookie('jwt', jwt, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            });
          res.send({
            token: jwt.sign({ _id: user._id }, 'jwt', { expiresIn: '7d' }),

          });
        });
    })
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new AlreadyExsists('Такой email уже существует');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((newuser) => {
          User.findById(newuser._id)
            .then((newuserdata) => {
              if (!newuserdata) throw new NotFound('Данный пользоватьель не найден');
              return res.send({ data: newuserdata });
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};
