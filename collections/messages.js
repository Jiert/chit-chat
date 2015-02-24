var _ = require('underscore'),
    Backbone = require('backbone'),
    Message = require('../models/message');
    
module.exports = Backbone.Firebase.Collection.extend({

  initialize: function(models, options){
    this.url = 'https://blinding-torch-9943.firebaseio.com/messages/' + options.room;
  },

  model: Message,
});