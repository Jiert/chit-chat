var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    MessagesCollection = require('../collections/messages'),
    
    MessageView = require('../views/message'),
    FormView = require('../views/form_view'),
    
    template = require('../templates/room.hbs');

module.exports = Backbone.View.extend({

  events: {},

  className: 'col-md-6',

  initialize: function(options){
    _.bindAll(this, 'renderMessages', 'renderMessage');


    this.messages = new MessagesCollection();
    this.listenTo(this.messages, {
      // TODO: This isn't the wy to go. We should only append new messages, 
      // rather than re-rendering each time we save just one message
      'sync': this.renderMessages,
    });
  },

  renderMessages: function(event){
    console.log('renderMessages event' , event);

    // debugger;

    this.$messages.html('');

    // TODO: This is a total hack and needs to be killed
    // this.cleanUp();
    this.messages.each(this.renderMessage);

    if (app.ref.getAuth()){
      this.renderForm();
    }

    // TODO: Sort out this massive memory leak!
    // So, we're cleaning up now, which is fine, 
    // But we need to not call renderMessagess everytime
    // we post a new message.
  },

  renderMessage: function(model){
    var messageView = this.createSubView( MessageView, {
      model: model,
      user: app.user.authData
    });

    this.$messages.append(messageView.render().el);
  }, 

  renderForm: function(){
    var formView = this.createSubView(FormView, { messages: this.messages });
    this.$messageInput.html(formView.render().el);
  },

  render: function() {
    this.$el.html(template());

    this.$messages = this.$('.messages');
    this.$messageInput = this.$('.message-input');

    return this;
  }

});