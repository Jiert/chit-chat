var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    RoomView = require('../views/room'),
    template = require('../templates/content.hbs'),
    SidebarView = require('../views/sidebar_nav');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderRooms', 'renderSidebar', 'renderRoom', 'buildRoom');

    this.userRoomsCollection = new Backbone.Collection();
    
    this.listenTo(this.userRoomsCollection, {
      'add'    : this.renderRoom,
      'remove' : this.removeRoom
    });

    this.listenTo(app.rooms, {
      'change' : this.onChange
    });

    if (app.user){
      this.userRoomsArray = app.user.has('rooms') ? app.user.get('rooms').split(',') : [];
    }
  },

  renderSidebar: function(){
    this.sidebarView = this.createSubView( SidebarView, {});
    this.$mainSidebarNav.html(this.sidebarView.render().el);
  },

  renderRooms: function(){    
    if (app.user && this.userRoomsArray.length) {
      _(this.userRoomsArray).each(this.buildRoom);

      this.$mainContent.html('');
      this.userRoomsCollection.each(this.renderRoom);
    }
  },

  buildRoom: function(id){
    this.userRoomsCollection.add(app.rooms.where({id: id}))
  },

  removeRoom: function(room){
    // TODO: Does removing a model from the collection get garbage collected?
  },

  onChange: function(room){
    if (room.get('open')){
      this.userRoomsCollection && this.userRoomsCollection.add(room);
    }
    else {
      this.userRoomsCollection && this.userRoomsCollection.remove(room);
    }
    if (app.user){
      app.user.set({ rooms: this.userRoomsCollection.pluck('id').toString() });
    }
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