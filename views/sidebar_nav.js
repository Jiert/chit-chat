var _ = require('underscore'),
    Backbone = require('backbone'),

    template = require('../templates/sidebar_nav.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){},

  onCreateRoomClick: function(){
    debugger;
  },

  render: function() {
    this.$el.html(template());
    return this;
  }

});