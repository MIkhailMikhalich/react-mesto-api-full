const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const express = require('express');

const {
  getUsers, getUserById, postUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserById);

router.post('/', celebrate({ body: Joi.object().keys({ name: Joi.string().min(2).max(30), about: Joi.string().min(2).max(30), avatar: Joi.string().pattern(new RegExp('(http|https)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?([a-zA-Z0-9\-\?\,\'\/\+&%\$#_]+)')) }) }), express.json(), postUser);

router.patch('/me', express.json(), celebrate({ body: Joi.object().keys({ name: Joi.string().min(2).max(30), about: Joi.string().min(2).max(30) }) }), updateUser);

router.patch('/me/avatar', celebrate({ body: Joi.object().keys({ avatar: Joi.string().pattern(new RegExp('(http|https)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?([a-zA-Z0-9\-\?\,\'\/\+&%\$#_]+)')) }).unknown(true) }), express.json(), updateUserAvatar);

module.exports = router;
