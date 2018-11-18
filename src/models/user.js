'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: string,
    required: [true, 'Username is required'],
    description: 'Enter username',
  },
  updatedAt: {
    type: date,
    default: Date.now,
  },
  createdAt: {
    type: date,
    default: Date.now,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
