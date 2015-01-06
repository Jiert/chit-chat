var _ = require('underscore'),
    Backbone = require('backbone'),
    template = require('../templates/beer.hbs');

module.exports = Backbone.View.extend({
  // template: _('Name: <%= name %> Type: <%= type %>').template(),

  initialize: function(){},

  render: function(){
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});