var _ = require('underscore'),
    Backbone = require('backbone'),
    AppView = require('./views/application');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'defaultRoute',
    // 'beers' : 'beerRoute'
  },

  initialize: function() {},

  defaultRoute: function() {
    this.appView = new AppView({
      el: '#everything'
    });
    this.appView.render();
  },

  // beerRoute: function(){
  //   this.activeView = new TestView({
  //     el: '#content'
  //   });
  // }

});