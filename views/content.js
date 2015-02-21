var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    RoomView = require('../views/room'),
    template = require('../templates/content.hbs'),
    message  = require('../templates/content_message.hbs'), 
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
      'add': this.renderRoom,
      'remove': this.checkRooms
    });
  },

  checkRooms: function(){
    if (app.openRooms.length < 1){
      this.$mainContent.html(message());
    }
  },

  renderSidebar: function(){
    this.sidebarView = this.createSubView( SidebarView, {});
    this.$mainSidebarNav.html(this.sidebarView.render().el);
  },

  renderRooms: function(){
    if (app.openRooms.length){
      this.$mainContent.html('');
      app.openRooms.each(this.renderRoom);
    }
    else {
      this.$mainContent.html(message());
    }
  },

  buildRoom: function(id){
    app.openRooms.add(app.rooms.where({ id: id }));
  },

  renderRoom: function(room){
    this.$mainContent.html('')
    if (app.user){
      app.user.set({ rooms: app.openRooms.pluck('id').toString() });
    }

    var roomView = this.createSubView( RoomView, {
      room: room
    });

    this.$roomsContainer.append(roomView.render().el);
  },

  render: function(){
    console.log('content render')

    this.$el.html(template({
      openRooms: app.openRooms.length
    }));

    this.$mainContent = this.$('#main-content');
    this.$mainSidebarNav = this.$('#main-sidebar-nav');
    this.$roomsContainer = this.$('#rooms-container');

    this.renderSidebar();
    this.renderRooms();

    return this;
  }

});