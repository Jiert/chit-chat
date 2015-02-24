var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/form.hbs');    

module.exports = Backbone.View.extend({

  events: {
    'click .submit-message' : 'onMessageSubmit',
    'keydown' : 'onKeyDown'
  },

  initialize: function(options){
    this.messages = options.messages;
  },

  onKeyDown: function(event){
    if (event.keyCode === 13){
      event.preventDefault();
      this.onMessageSubmit();
    }
  },

  teardown: function(){
    console.log('form view teardown')
  },

  onMessageSubmit: function(){
    var message = this.$message.val();

    if (message){
      this.$message.parent().toggleClass('has-warning', false);
      this.messages.create({
        author: app.user.get('userName'),
        message: this.$message.val()
      });
      this.$message.val('');
    }
    else {
      this.$message.parent().toggleClass('has-warning', true);
    }
  },

  render: function(){
    this.$el.html(template());
    this.$message = this.$('.message');
    return this;
  }

});