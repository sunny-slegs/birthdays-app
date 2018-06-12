'use strict';

const express = require ('express');

const router = express.Router();

const mongoose = require('mongoose');

const Friend = require('../models/friend');

// GET all friends
router.get('/', (req, res, next) => {
  Friend.find()
    .sort({friend: 'asc'})
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

//GET by id
router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  Friend.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
}); 

//POST a new friend
router.post('/', (req,res,next) => {
  const {friend, birthday, address, folderId} = req.body;

  //validate user input

  if(!friend) {
    const err = new Error ('Missing `title` in the request body');
    err.status = 400;
    return next(err);
  }

  if(!birthday) {
    const err = new Error ('Missing `birthday` in the request body');
    err.status = 400;
    return next(err);
  }

  if (folderId && !mongoose.Types.ObjectId.isValid(folderId)) {
    const err = new Error('The `folderId` is not valid');
    err.status = 400;
    return next(err);
  }

  const newFriend = {
    friend,
    birthday,
    address,
    folderId
  };

  Friend.create(newFriend)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });

});

//PUT/UPDATE a friend
router.put('./:id', (req, res, next) => {
  const {id} = req.params;
  const {friend, birthday, address, folderId} = req.body;

   /***** Never trust users - validate input *****/
   if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (friend === '') {
    const err = new Error('Missing `friend` in request body');
    err.status = 400;
    return next(err);
  }

  if (folderId && !mongoose.Types.ObjectId.isValid(folderId)) {
    const err = new Error('The `folderId` is not valid');
    err.status = 400;
    return next(err);
  }

  const updatedFriend = {
    friend,
    birthday,
    address: address === '' ? null : address,
    folderId: folderId === '' ? null : folderId
  };

  Friend.findByIdAndUpdate(id, updatedFriend, {new: true})
    .then(result => {
      if(result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

//DELETE friend
router.delete('/:id', (req, res, next) => {
  const {id} = req.params;

   /***** Never trust users - validate input *****/
   if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Friend.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
}); 

module.exports = router;