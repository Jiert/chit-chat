var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    SidebarView = require('../views/sidebar_nav'),
    RoomView = require('../views/room'),

    template = require('../templates/content.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderSidebar', 'renderRoom');

    this.listenTo(app.rooms, {
      'remove' : this.onRemoveRoom
    });
  },

  renderSidebar: function(){
    this.sidebarView = this.createSubView( SidebarView, {});
    this.$mainSidebarNav.html(this.sidebarView.render().el);

    this.listenTo(this.sidebarView, {
      'room:clicked' : this.renderRoom
    });
  },

  renderRooms: function(){
    this.$mainContent.html('');

    console.log('content: renderRooms');

    // We don't want new rooms being added automatically
    // Only render a room if a user has clicked on it,
    // But maybe render a room if the user just created it

    // Maybe use local storage to keep track of rooms that the user
    // Has clicked on.

    // For Now:
    // app.rooms.each( this.renderRoom );
  },


  onRemoveRoom: function(){
    console.log('content: onRemoveRoom');
  },

  renderRoom: function(room){
    // It should be here where we store a user's rooms
    var roomView = this.createSubView( RoomView, {
      room: room
    });

    this.$mainContent.append(roomView.render().el);
  },

  render: function() {
    this.$el.html(template());

    this.$mainContent = this.$('#main-content');
    this.$mainSidebarNav = this.$('#main-sidebar-nav');

    this.renderSidebar();
    this.renderRooms();

    return this;
  }

});