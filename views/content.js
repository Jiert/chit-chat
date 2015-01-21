var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    RoomsCollection = require('../collections/rooms'),

    SidebarView = require('../views/sidebar_nav'),
    RoomView = require('../views/room'),

    template = require('../templates/content.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderSidebar');
  },

  getRooms: function(){
    // Set up Rooms collection
    this.rooms = new RoomsCollection();

    // TODO: Maybe a better way to listen to rooms
    this.listenTo(this.rooms, {
      'sync' : this.renderRooms
    });
  },

  renderSidebar: function(){
    var sidebarView = this.createSubView( SidebarView, {});

    this.$mainSidebarNav.html(sidebarView.render().el);
  },

  renderRooms: function(){
    // TODO: Get real rooms collection here instead of
    // Dummying it up

    if (this.rooms.length){
      this.rooms.each(this.renderRoom);
    }
    else {
      // this.$mainContent.html('There are no rooms currently active.');
      var roomView = this.createSubView( RoomView, {});
      this.$mainContent.html(roomView.render().el);
    }

  },

  renderRoom: function(room){
    var roomView = this.createSubView( RoomView, {
      room: room
    });

    this.$mainContent.html(roomView.render().el);
  },

  render: function() {
    this.$el.html(template());

    this.$mainContent = this.$('#main-content');
    this.$mainSidebarNav = this.$('#main-sidebar-nav');

    console.log('content render');

    this.renderSidebar();
    this.getRooms();

    return this;
  }

});