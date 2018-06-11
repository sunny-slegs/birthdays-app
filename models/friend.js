'use strict';

const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  name: {type: String, required: true},
  birthday: {type: String, required:true},
  address: {type: String},
  folderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}
});

//Add 'createdAt' and updatedAt' fields
friendSchema.set('timesatmps', true);

//Convert _id to id and remove _v property
friendSchema.set('toObject', {
  virtuals: true, //include built-in-virtual `id`
  versionKey: false, //remove _v version key
  transform: (cod, ret) => {
    delete ret._id; //delete `_id`
  }
});

module.exports = mongoose.model('Friend', friendSchema);
