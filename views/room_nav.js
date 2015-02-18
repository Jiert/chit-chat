var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/sidebar_nav_room.hbs'); 

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    debugger;
  },

  render: function(){
    this.$el.html(template({
      id: this.model.get('id'),
      name: this.model.get('name'),
      active: this.model.get('active') || 0
    }));
    return this;
  }

});