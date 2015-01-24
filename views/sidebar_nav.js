var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    ModalView = require('../views/modal'),

    template = require('../templates/sidebar_nav.hbs'),
    createRoom = require('../templates/create_room.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){},

  onCreateRoomClick: function(){
    this.modalView = this.createSubView( ModalView, {
      onConfirmed: this.onConfirmRoom,
      modalBody: createRoom
    });
  },

  // TODO: Sort out the best way to get a 
  // confirmed callback from the modal view
  onConfirmRoom: function(){
    console.log('onConfirmRoom');
  },

  render: function() {
    this.$el.html(template({
      user: app.ref.getAuth()
    }));

    return this;
  }

});