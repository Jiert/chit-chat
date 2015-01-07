var _ = require('underscore'),
    Backbone = require('backbone'),
    template = require('../templates/beer.hbs');

module.exports = Backbone.View.extend({

  initialize: function(){},

  render: function(){
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});