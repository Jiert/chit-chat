var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    ModalView = require('../views/modal'),

    template = require('../templates/sidebar_nav.hbs'),
    roomLabel = require('../templates/sidebar_nav_room.hbs'),
    createRoom = require('../templates/create_room.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){
    _.bindAll( this, 'renderRoom', 'onConfirmRoom');

    this.listenTo( app.rooms, {
      'sync' : this.onRooms
    });
  },

  onCreateRoomClick: function(){
    this.modalView = this.createSubView( ModalView, {
      onConfirm   : this.onConfirmRoom,
      modalBody   : createRoom,
      confirmText : 'Create Room'
    });
  },

  onRooms: function(){
    // TODO: I don't like this nonsense of re-rendering
    // This entire list ever time there's a new name.
    // It would be ideal to only insert 'new' models
    this.$rooms.html('');

    app.rooms.each(this.renderRoom);
  },

  renderRoom: function(room){
    this.$rooms.append(roomLabel({
      name: room.get('name'),
      active: room.get('active') || 0
    }));
  },

  // TODO: Sort out the best way to get a 
  // confirmed callback from the modal view
  onConfirmRoom: function(){
    app.rooms.push({
      creator: app.user.authData.userName,
      name: this.modalView.$('input').val()
    });

    this.modalView.hide();
  },

  render: function() {
    this.$el.html(template({
      user: app.ref.getAuth()
    }));

    this.$rooms = this.$('.rooms');

    return this;
  }

});