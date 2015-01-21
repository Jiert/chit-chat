var _ = require('underscore'),
    Backbone = require('backbone'),
    Room = require('../models/room');
    
module.exports = Backbone.Firebase.Collection.extend({
  model: Room,
  url: 'https://blinding-torch-9943.firebaseio.com/rooms'
});