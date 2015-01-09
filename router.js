var _ = require('underscore'),
    Backbone = require('backbone'),
    AppView = require('./views/application'),
    TestView = require('./views/test');

module.exports = Backbone.Router.extend({
  routes: {
    // '': 'defaultRoute',
    'beers' : 'beerRoute'
  },

  initialize: function() {
    console.log('initialize')
    // debugger;
    this.appView = new AppView({
      el: '#everything'
    });    
  },

  // defaultRoute: function() {
  //   this.appView = new AppView({
  //     el: '#everything'
  //   });
  // },

  beerRoute: function(){
    // this.ensureApp();

    this.activeView = new TestView({
      el: '#content'
    });
  }

});