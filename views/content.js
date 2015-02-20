var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    RoomView = require('../views/room'),
    template = require('../templates/content.hbs'),
    SidebarView = require('../views/sidebar_nav');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderRooms', 'renderSidebar', 'renderRoom', 'buildRoom');

    app.openRooms = new Backbone.Collection();

    if (app.user){
      // TODO: sometimes app.user.rooms is an emtpy string and passes truth test
      this.userRoomsArray = app.user.has('rooms') ? app.user.get('rooms').split(',') : [];
      this.userRoomsArray.length && _(this.userRoomsArray).each(this.buildRoom);
    }
    
    this.listenTo(app.openRooms, {
      'add': this.renderRoom
    });
  },

  renderSidebar: function(){
    this.sidebarView = this.createSubView( SidebarView, {});
    this.$mainSidebarNav.html(this.sidebarView.render().el);
  },

  renderRooms: function(){
    app.openRooms.length && app.openRooms.each(this.renderRoom);
  },

  buildRoom: function(id){
    app.openRooms.add(app.rooms.where({ id: id }));
  },

  renderRoom: function(room){
    if (app.user){
      app.user.set({ rooms: app.openRooms.pluck('id').toString() });
    }

    var roomView = this.createSubView( RoomView, {
      room: room
    });

    this.$mainContent.append(roomView.render().el);
  },

  render: function() {
    this.$el.html(template({
      roomsOpen: app.openRooms.length
    }));

    this.$mainContent = this.$('#main-content');
    this.$mainSidebarNav = this.$('#main-sidebar-nav');

    this.renderSidebar();
    this.renderRooms();

    return this;
  }

});