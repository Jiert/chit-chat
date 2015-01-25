var _ = require('underscore'),
    // app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/message.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.user = options.user;
  },

  render: function(){
    // console.log('rendering message')
    // TODO: Why on earth isn't app defined here?
    var userName = this.user && this.user.userName,
        authorClass = this.model.get('author') === userName ? 'primary' : 'success';

    this.$el.html(template({
      model: this.model.toJSON(),
      authorClass: authorClass
    }));
    return this;
  }
});