// TODO: This view should handle the main messge views

var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    MessagesCollection = require('../collections/messages'),

    SidebarView = require('../views/sidebar_nav'),
    MessageView = require('../views/message'),
    FormView = require('../views/form_view'),

    template = require('../templates/content.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderMessages', 'renderMessage', 'renderSidebar');

    this.messages = new MessagesCollection();
    this.listenTo(this.messages, {
      // TODO: This isn't the wy to go. We should only append new messages, 
      // rather than re-rendering each time we save just one message
      'sync': this.renderMessages,
    });
  },

  cleanUp: function(){
    if (this.subViews && this.subViews.length){
      _(this.subViews).each(function(subView){
        subView.destroy();
      });
    }
  },

  renderSidebar: function(){
    var sidebarView = this.createSubView( SidebarView, {});

    this.$mainSidebarNav.html(sidebarView.render().el);
  },

  renderMessages: function(event){
    console.log('renderMessages event' , event);

    this.$mainContent.html('');

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

    this.$mainContent.append(messageView.render().el);
  },  

  renderForm: function(){
    var formView = this.createSubView(FormView, { messages: this.messages });
    this.$mainContent.append(formView.render().el);
  },

  render: function() {
    this.$el.html(template());

    this.$mainContent = this.$('#main-content');
    this.$mainSidebarNav = this.$('#main-sidebar-nav');

    console.log('content render');

    this.renderSidebar();

    // TODO: There's got to be a better way to do 
    // this in tandom with listenTo: sync
    // if (this.messages.length){
    //   this.renderMessages();
    // }
    return this;
  }

});