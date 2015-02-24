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
    _.bindAll(this, 'renderMessages', 'renderMessage', 'scrollToBottom', 'focus', 'deferred');

    if (!options.room) return;

    // Shouldn't need this if passed as model
    this.model = options.room;

    // Jesus, we have the room, so we have the messages, 
    // should we pass the messages into the collection?
    // Or does Firebase do that by itself already?
    this.messages = new MessagesCollection([], {
      room: 'room' + this.model.id,
    });

    this.listenTo(this.messages, {
      'add' : this.onAdd
    });

    this.listenTo(this.model, {
      'remove' : this.destroy
    })
  },

  teardown: function(){
    console.log('room teardown')
    app.openRooms.remove(this.model);

    if (app.user){
      app.user.set({ rooms: app.openRooms.pluck('id').toString() });
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
    var formView = this.createSubView(FormView, { 
      messages: this.messages,
      model: this.model
    });
    this.$messageInput.html(formView.render().el);
  },

 focus: function(){
    var $input = this.$messageInput.find('input');
    var func = function(){
      $input.focus();
    }
    // I mean... it works...
    this.deferred(func);
  },

  deferred: function(func){
    _(func).defer();
  },

  scrollToBottom: function(){
    var scrollHeight = this.$messages.prop('scrollHeight');
    this.$messages.scrollTop(scrollHeight);
  },

  render: function() {
    this.$el.html(template(this.model.toJSON()));

    this.$messages = this.$('.messages');
    this.$messageInput = this.$('.message-input');

    // Why does it seem like this.messages is here instantly 
    // is this here becasue we already have rooms?
    this.renderMessages();

    _(this.scrollToBottom).defer();

    if (app.ref.getAuth()){
      this.renderForm();
    }

    return this;
  }

});