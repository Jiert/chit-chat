// TODO: This view should handle the main messge views

var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    MessagesList = require('../collections/messages.js'),

    MessageView = require('../views/message'),
    FormView = require('../views/form_view');

module.exports = Backbone.View.extend({

  className: 'main-content',

  initialize: function(options){
    _.bindAll(this, 'renderMessages', 'renderMessage');

    this.messages = new MessagesList();
    this.listenTo(this.messages, {
      // TODO: This isn't the wy to go. We should only append new messages, 
      // rather than re-rendering each time we save just one message
      'sync': this.renderMessages,
      // 'add' : this.renderBeer
    });
  },

  cleanUp: function(){
    if (this.subViews && this.subViews.length){
      _(this.subViews).each(function(subView){
        subView.destroy();
      });
    }
  },

  renderMessages: function(event){
    console.log('renderMessages event' , event);

    this.cleanUp();

    this.$el.html('');
    this.messages.each(this.renderMessage);

    if (app.ref.getAuth()){
      this.renderForm();
    }

    // TODO: Sort out this massive memory leak!
    // So, we're cleaning up now, which is fine, 
    // But we need to not call renderBeers everytime
    // we post a new message.
  },

  renderMessage: function(model){
    var messageView = this.createSubView(MessageView, {
      model: model,
      user: app.user.authData
    });

    this.$el.append(messageView.render().el);
  },  

  renderForm: function(){
    var formView = this.createSubView(FormView, { messages: this.messages });
    this.$el.append(formView.render().el);
  },

  render: function() {
    this.$el.html('Loading Messages...');

    console.log('content render');

    // TODO: There's got to be a better way to do 
    // this in tandom with listenTo: sync
    if (this.messages.length){
      this.renderMessages();
    }
    return this;
  }

});