var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    MessagesCollection = require('../collections/messages'),
    
    MessageView = require('../views/message'),
    FormView = require('../views/form_view'),
    
    template = require('../templates/room.hbs');

module.exports = Backbone.View.extend({

  className: 'col-md-6',
  events: {
    'click .close' : 'destroy'
  },

  initialize: function(options){
    _.bindAll(this, 'renderMessages', 'renderMessage', 'scrollToBottom');

    if (!options.room) return;

    this.model = options.room;

    // Jesus, we have the room, so we have the messages, 
    // should we pass the messages into the collection?
    // Or does Firebase do that by itself already?
    this.messages = new MessagesCollection([], {
      room: this.model.id,
    });

    this.listenTo(this.messages, {
      'add' : this.onAdd
    });
  },

  teardown: function(){
    if (app.user){

      this.model.trigger('room:unsubscribe', this.model);

      // TODO: Get rid of this string bullshit
      var oldRooms = app.user.get('rooms').split(','),
          newRooms = _(oldRooms).without(this.model.id).toString();
      app.user.set('rooms', newRooms);
    }
  },

  renderMessages: function(){
    this.$messages.html('');
    this.messages.each(this.renderMessage);
  },

  onAdd: function(message){
    this.renderMessage(message);
    this.scrollToBottom();
  },

  renderMessage: function(model){
    var messageView = this.createSubView( MessageView, {
      model: model
    });

    this.$messages.append(messageView.render().el);
  }, 

  renderForm: function(){
    var formView = this.createSubView(FormView, { messages: this.messages });
    this.$messageInput.html(formView.render().el);
  },

  scrollToBottom: function(){
    var scrollHeight = this.$messages.prop('scrollHeight');
    this.$messages.scrollTop(scrollHeight);
  },

  render: function() {
    this.$el.html(template(this.model.toJSON()));

    this.$messages = this.$('.messages');
    this.$messageInput = this.$('.message-input');

    // Why does it seem like this.messages is here instanly 
    // is this here becasue we already have rooms?
    this.renderMessages();

    _(this.scrollToBottom).defer();

    if (app.ref.getAuth()){
      this.renderForm();
    }

    return this;
  }

});