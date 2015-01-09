var _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    this.render();
    debugger;
  },

  render: function() {
    this.$el.html('testings');
    return this;
  }

});