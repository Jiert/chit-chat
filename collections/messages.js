var _ = require('underscore'),
    Backbone = require('backbone'),
    Message = require('../models/message');
    
module.exports = Backbone.Firebase.Collection.extend({
  model: Message,
  url: 'https://blinding-torch-9943.firebaseio.com/messages'
});