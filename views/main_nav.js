var _ = require('underscore'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    debugger;

    // _.bindAll(this, 'onBeers', 'renderBeer');

    this.render();
  },

  render: function() {
    this.$el.html(template());
    return this;
  }

});