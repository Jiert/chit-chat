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

    this.messages = new MessagesCollection([], {
      room: this.model.id,
    });

    this.listenTo(this.messages, {
      // TODO: This isn't the wy to go. We should only append new messages, 
      // rather than re-rendering each time we save just one message
      'sync': this.renderMessages,
      'add' : this.onAdd
    });
  },

  renderMessages: function(){
    // debugger;

    this.stopListening(this.messages, 'sync');

    console.log('room: renderMessages');

    this.$messages.html('');

    // TODO: This is a total hack and needs to be killed
    // this.cleanUp();
    this.messages.each(this.renderMessage);

    // TODO: HERE IT IS FOLKS: 
    // console.log('subViews: ', this.subViews && this.subViews.length);


    // TODO: For now, this will work, but it will
    // need to be fixed once the memory leak is fixed
    var scrollHeight = this.$messages.prop('scrollHeight');
    this.$messages.scrollTop(scrollHeight);

    // TODO: Sort out this massive memory leak!
    // So, we're cleaning up now, which is fine, 
    // But we need to not call renderMessagess everytime
    // we post a new message.
  },

  onAdd: function(message){
    this.renderMessage(message);
  },

  onSync: function(){
    debugger;
  },

  // TODO: Get rid of this shit
  cleanUp: function(){
    _(this.subViews).each(function(subView){
      subView.destroy();
    });
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

    // TODO: There's got to be a better way to do 
    // this in tandom with listenTo: sync
    // if (this.messages && this.messages.length){
    //   this.renderMessages();
    // }
  
    // Why doesn't sync fire here?    
    // this.listenTo(this.messages, {
    //   'sync': this.renderMessages,
    //   'add' : this.onAdd
    // });

    if (app.ref.getAuth()){
      this.renderForm();
    }

    return this;
  }

});