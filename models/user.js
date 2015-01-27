var _ = require('underscore'),
    Backbone = require('backbone');

module.exports  = Backbone.Firebase.Model.extend({
  urlRoot: 'https://blinding-torch-9943.firebaseio.com/users/', 

  defaults: {
    rooms: []
  }
});