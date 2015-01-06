var _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _('Name: <%= name %> Type: <%= type %>').template(),

  initialize: function(){},

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});