var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    ModalView = require('../views/modal'),

    template = require('../templates/sidebar_nav.hbs'),
    roomLabel = require('../templates/sidebar_nav_room.hbs'),
    createRoom = require('../templates/create_room.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click .rooms a'     : 'onRoomClick',
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){
    _.bindAll( this, 'renderRoom', 'onConfirmRoom');

    this.listenTo(app.rooms, {
      'add' : this.renderRoom
    });
  },

  onRoomClick: function(event){
    event.preventDefault();
    $(event.currentTarget).parent().addClass('active');

    var roomId = $(event.currentTarget).attr('href'),
        roomModel = app.rooms.get(roomId);

    this.trigger('room:clicked', roomModel);
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

    // Should these be rooms so we're not
    // dependant on the DOM for romo info?
    this.$rooms.append(roomLabel({
      id: room.get('id'),
      name: room.get('name'),
      active: room.get('active') || 0
    }));
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