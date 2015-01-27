var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    SidebarView = require('../views/sidebar_nav'),
    RoomView = require('../views/room'),

    template = require('../templates/content.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderSidebar', 'renderRoom', 'onRoomClick', 'getRooms', 'buildRoom');

    this.listenTo(app.rooms, {
      'remove' : this.onRemoveRoom
    });

    if (app.user){
      this.userRooms = app.user.has('rooms') ? app.user.get('rooms').split(',') : [];
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
    this.$mainContent.html('');

    if (app.user && app.user.has('rooms')){
      this.getRooms();
    }
  },

  getRooms: function(){
    this.userRoomsCollection = new Backbone.Collection();

    app.rooms.each(this.buildRoom);

    this.userRoomsCollection.each(this.renderRoom);
  },

  buildRoom: function(room){
    if (this.userRooms.indexOf(room.id) !== -1){
      this.userRoomsCollection.add(room);
    }
  },

  onRemoveRoom: function(){
    console.log('content: onRemoveRoom');
  },

  onRoomClick: function(room){
    if (app.user){
      this.userRooms.push(room.get('id'));

      // Why on earth doesn't this work?
      // app.user.set({'rooms': userRooms });

      // Jesus Christ
      // TODO: Find a better way for this,
      // Flatten Data
      app.user.set({'rooms': this.userRooms.toString() });
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