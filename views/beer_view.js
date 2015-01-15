var _ = require('underscore'),
    // app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/beer.hbs');

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.user = options.user;
  },

  render: function(){
    console.log('Author: ' + this.model.get('author'));

    // TODO: Why on earth isn't app defined here?
    // debugger;
    var isAuthor = this.model.get('author') === this.user && this.user.userName ? true : false;

    this.$el.html(template({
      model: this.model.toJSON(),
      style: isAuthor ? 'primary' : 'success'
    }));
    return this;
  }
});