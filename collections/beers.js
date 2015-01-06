var _ = require('underscore'),
    Backbone = require('backbone'),
    Beer = require('../models/beer');
    
module.exports = Backbone.Firebase.Collection.extend({
  model: Beer,
  url: 'https://blinding-torch-9943.firebaseio.com/'
});