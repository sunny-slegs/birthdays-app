
'use strict';

const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: {type: String, require: true}
});

folderSchema.set('timestamp', true);

folderSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Folder', folderSchema);