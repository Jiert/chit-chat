var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    MessagesCollection = require('../collections/messages'),
    
    MessageView = require('../views/message'),
    FormView = require('../views/form_view'),
    
    template = require('../templates/room.hbs');

module.exports = Backbone.View.extend({

  className: 'col-md-6',

  initialize: function(options){
    _.bindAll(this, 'renderMessages', 'renderMessage');

    if (!options.room) return;

    this.model = options.room;

    // Jesus, we have the room, so we have the messages, should we pass the messages into the collection?
    // Or does Firebase do that by itself already?
    this.messages = new MessagesCollection([], {
      room: this.model.id,
    });

    this.listenTo(this.messages, {
      'add' : this.onAdd
    });
  },

  renderMessages: function(){
    console.log('room: renderMessages');

    this.$messages.html('');

    this.messages.each(this.renderMessage);

    // TODO: For now, this will work, but it will
    // need to be fixed once the memory leak is fixed
    var scrollHeight = this.$messages.prop('scrollHeight');
    this.$messages.scrollTop(scrollHeight);
  },

  onAdd: function(message){
    this.renderMessage(message);

    var scrollHeight = this.$messages.prop('scrollHeight');
    this.$messages.scrollTop(scrollHeight);
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
    console.log('room: render')

    this.$el.html(template(this.model.toJSON()));

    this.$messages = this.$('.messages');
    this.$messageInput = this.$('.message-input');

    // Why does it seem like this.messages is here insta... is this here becasue we already have rooms?
    this.renderMessages();

    if (app.ref.getAuth()){
      this.renderForm();
    }

    return this;
  }

});