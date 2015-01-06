var _ = require('underscore'),
    Backbone = require('backbone'),
    AppView = require('./views/application');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'defaultRoute'
  },

  initialize: function() {},

  defaultRoute: function() {
    this.appView = new AppView({
      el: '#everything'
    });
  },

});