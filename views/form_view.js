var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    BeerModel = require('../models/beer'),
    template = require('../templates/form.hbs');    

module.exports = Backbone.View.extend({

  events: {
    'click #submit-message' : 'onMessageSubmit'
  },

  initialize: function(options){
    this.model = new BeerModel();
    this.beers = options.beers;

    this.messages = app.ref.child('messages');
  },

  onMessageSubmit: function(event){
    event.preventDefault();
debugger;
    this.messages.push({
      author: 'jared',
      message: this.$('[name="message"]').val()
    });
  },

  render: function(){
    this.$el.html(template());

    return this;
  }

});