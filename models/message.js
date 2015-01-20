var _ = require('underscore'),
    Backbone = require('backbone');

module.exports  = Backbone.Model.extend({
  defaults: function() {
    return {
      title: "New Message",
    };
  },
});