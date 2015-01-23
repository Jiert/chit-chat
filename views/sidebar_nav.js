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

  initialize: function(options){
    // console.log('sidebar_nav init; ', app.ref.getAuth())
  },

  onCreateRoomClick: function(){
    this.modalView = this.createSubView( ModalView, {
      onConfirmed: this.onConfirmRoom,
      modalBody: createRoom
    });



    // TODO: I don't like this syntax, should
    // be a cleaner way to do this
    $('body').append(this.modalView.render().el);

    this.modalView.show();
  },

  onConfirmRoom: function(){
    console.log('onConfirmRoom');
    // debugger;
  },

  render: function() {
    this.$el.html(template({
      user: app.ref.getAuth()
    }));



    // this.$createModal = this.$('.modal');
    
    return this;

  }

});