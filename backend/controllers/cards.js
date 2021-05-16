const objectId = require('mongodb').ObjectID;
const NotFound = require('../errors/not-found-err.js');
const IncorrectData = require('../errors/incorrect-data.js');
const DoNotHavePermission = require('../errors/do-not-have-permisson.js');
const Card = require('../models/card.js');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  if (!objectId.isValid(req.params.cardid)) throw new IncorrectData('Переданы некоректные данные');
  Card.findById(req.params.cardid)
    .then((card) => {
      if (!card) throw new NotFound('Данная карточка не найдена');
      const cardID = String(card.owner._id);
      const userID = req.user._id;
      if (userID === cardID) {
        Card.findByIdAndRemove(req.params.cardid)
          .then(() => {
            if (!card) throw new NotFound('Данная карточка не найдена');
            return res.send({ data: card });
          })
          .catch(next);
      } else throw new DoNotHavePermission('Карточка принадлежит другому пользователю');
    })
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const regex = /(http|https)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?([a-zA-Z0-9\-\?\,\'\/\+&%\$#_]+)/gim;
  const { name, link } = req.body;
  const owner = req.user._id;
  if (link === undefined || !regex.test(link) || !name) throw new IncorrectData('Переданы некорректные данные');
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  if (!objectId.isValid(req.params.cardid)) throw new IncorrectData('Переданы некоректные данные');
  Card.findByIdAndUpdate(
    req.params.cardid,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFound('Данная карточка не найдена');
      return res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  if (!objectId.isValid(req.params.cardid)) throw new IncorrectData('Переданы некоректные данные');
  Card.findByIdAndUpdate(
    req.params.cardid,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFound('Данная карточка не найдена');
      return res.send(card);
    })
    .catch(next);
};
