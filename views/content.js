var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    SidebarView = require('../views/sidebar_nav'),
    RoomView = require('../views/room'),

    template = require('../templates/content.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderRooms', 'renderSidebar', 'renderRoom', 'onRoomClick', 'buildRoom');

    this.userRoomsCollection = new Backbone.Collection();
    
    this.listenTo(this.userRoomsCollection, {
      'room:unsubscribe' : this.onViewDestroy
    });

    this.listenTo(app.rooms, {
      'remove' : this.onRemoveRoom
    });

    if (app.user){
      this.userRoomsArray = app.user.has('rooms') ? app.user.get('rooms').split(',') : [];
    }
  },

  renderSidebar: function(){
    this.sidebarView = this.createSubView( SidebarView, {});
    this.$mainSidebarNav.html(this.sidebarView.render().el);

    this.listenTo(this.sidebarView, {
      'room:clicked' : this.onRoomClick
    });
  },

  renderRooms: function(){    
    if (this.userRoomsArray.length) {
      _(this.userRoomsArray).each(this.buildRoom);

      this.$mainContent.html('');
      this.userRoomsCollection.each(this.renderRoom);
    }
  },

  buildRoom: function(id){
    this.userRoomsCollection.add(app.rooms.where({id: id}))
  },

  onRemoveRoom: function(){
    console.log('content: onRemoveRoom');
  },

  onViewDestroy: function(room){
    this.userRoomsCollection.remove(room);
  },

  onRoomClick: function(room){
    if (this.userRoomsCollection && this.userRoomsCollection.contains(room)) return;

    this.userRoomsCollection.add(room);

    if (app.user){
      app.user.set({ rooms: this.userRoomsCollection.pluck('id').toString() });
    }

    this.renderRoom(room);
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
    this.renderRooms();

    return this;
  }

});