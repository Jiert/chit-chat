var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    ModalView = require('../views/modal'),

    template = require('../templates/sidebar_nav.hbs'),
    createModal = require('../templates/create_room.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-room' : 'onCreateRoomClick'
  },

  initialize: function(options){
    // console.log('sidebar_nav init; ', app.ref.getAuth())
  },

  onCreateRoomClick: function(){
    // debugger;
    // this.$createModal.modal();

    this.modalView = this.createSubView( ModalView, {
      content: createModal
    });

    $('body').append(this.modalView.render().el);

    this.modalView.show();
  },

  render: function() {
    this.$el.html(template({
      user: app.ref.getAuth()
    }));



    // this.$createModal = this.$('.modal');
    
    return this;

  }

});