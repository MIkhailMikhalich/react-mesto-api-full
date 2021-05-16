const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, postCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);

router.delete('/:cardid', celebrate({
  params: Joi.object().keys({
    cardid: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCardById);

router.put('/:cardid/likes', celebrate({
  params: Joi.object().keys({
    cardid: Joi.string().alphanum().length(24).hex(),
  }),
}), likeCard);

router.delete('/:cardid/likes', celebrate({
  params: Joi.object().keys({
    cardid: Joi.string().alphanum().length(24).hex(),
  }),
}), dislikeCard);

router.post('/', celebrate({ body: Joi.object().keys({ link: Joi.string().pattern(new RegExp('(http|https)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?([a-zA-Z0-9\-\?\,\'\/\+&%\$#_]+)')), name: Joi.string().min(2).max(30) }) }), postCard);

module.exports = router;
