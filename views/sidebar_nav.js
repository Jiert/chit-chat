var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),
    ModalView = require('../views/modal'),
    RoomNavView = require('../views/room_nav'),
    template = require('../templates/sidebar_nav.hbs'),
    createRoom = require('../templates/create_room.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){
    _.bindAll( this, 'renderRoom', 'onConfirmRoom');

    this.listenTo(app.rooms, {
      'add' : this.renderRoom
    });
  },

  onCreateRoomClick: function(){
    this.modalView = this.createSubView( ModalView, {
      onConfirm   : this.onConfirmRoom,
      modalBody   : createRoom,
      confirmText : 'Create Room'
    });
  },

  renderRooms: function(){
    this.$rooms.html('');
    app.rooms.each(this.renderRoom);
  },

  renderRoom: function(room){
    // TODO: Need to be send if user subscribed
    var roomNavView = this.createSubView( RoomNavView, {
      model: room
    })

    this.$rooms.append( roomNavView.render().el );
  },

  // TODO: Sort out the best way to get a 
  // confirmed callback from the modal view
  onConfirmRoom: function(){
    app.rooms.push({
      creator: app.user.get('userName'),
      name: this.modalView.$('input').val()
    });

    this.modalView.hide();
  },

  render: function() {
    this.$el.html(template({
      user: app.user
    }));

    this.$rooms = this.$('.rooms');

    this.renderRooms();

    return this;
  }

});