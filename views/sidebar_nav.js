var _ = require('underscore'),
    Backbone = require('backbone'),

    template = require('../templates/sidebar_nav.hbs');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){},

  render: function() {
    this.$el.html(template());
    return this;
  }

});