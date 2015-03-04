var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),
    ModalView = require('../views/modal'),
    RoomNavView = require('../views/room_nav'),
    template = require('../templates/sidebar_nav.hbs'),
    ValidationModel = require('../models/validation'),
    createRoom = require('../templates/create_room.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){
    _.bindAll( this, 'renderRoom', 'onConfirmRoom', 'toggleMessage');

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
    // debugger;

    this.validationModel = new ValidationModel({
      validation: {
        name: {
          required : true,
          value    : this.modalView.$('input').val(),
          type     : 'text'
        }
      }
    });

    this.validationModel.validate();

    if (this.validationModel.isValid()){
      app.rooms.push({
        creator: app.user.get('userName'),
        name: this.modalView.$('input').val()
      });

      this.modalView.hide();
    }
    else {
      var keys = this.validationModel.errors && _(this.validationModel.errors).keys();
      _(keys).each(this.toggleMessage);
    }
  },


  toggleMessage: function(input){
    var $el = this.modalView.$('[name="'+input+'"]');

    $el.tooltip({
      // TODO:  This.... seems brittle

      // RAGE
      title: this.validationModel.errors[input].message,
      trigger: 'focus'
    })

    $el.tooltip('show')
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