var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    SidebarView = require('../views/sidebar_nav'),
    RoomView = require('../views/room'),

    template = require('../templates/content.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderSidebar', 'renderRoom');

    // TODO: Maybe a better way to listen to rooms
    this.listenTo(app.rooms, {
      'sync' : this.renderRooms
    });
  },

  renderSidebar: function(){
    var sidebarView = this.createSubView( SidebarView, {});
    this.$mainSidebarNav.html(sidebarView.render().el);
  },

  renderRooms: function(){
    // Stop Listening to sync events, and only 
    // listen to adds and removals from the point on
    this.stopListening(app.rooms, 'sync');
    this.listenTo(app.rooms, {
      'add' : this.onAddRoom,
      'remove' : this.onRemoveRoom
    });

    this.$mainContent.html('');

    console.log('content: renderRooms');

    // We don't want new rooms being added automatically
    // Only render a room if a user has clicked on it,
    // But maybe render a room if the user just created it

    // Maybe use local storage to keep track of rooms that the user
    // Has clicked on.

    // For Now:
    app.rooms.each( this.renderRoom );
  },

  onAddRoom: function(){
    console.log('content: onAddRoom');
  },

  onRemoveRoom: function(){
    console.log('content: onRemoveRoom');
  },

  renderRoom: function(room){
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

    return this;
  }

});