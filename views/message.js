var _ = require('underscore'),
    Backbone = require('backbone'),
    template = require('../templates/message.hbs');

module.exports = Backbone.View.extend({

  teardown: function(){
    console.log('message teardown')
  },

  render: function(){
    var userName = app.user && app.user.get('userName'),
        authorClass = this.model.get('author') === userName ? 'primary' : 'success';

    this.$el.html(template({
      model: this.model.toJSON(),
      authorClass: authorClass
    }));
    return this;
  }
});