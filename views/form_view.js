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

    // We're assuming app.user.yadayada will be here because as soon
    // as a logout event occurs this view will killed

    // TODO: make sure this view is really killed on logout events
    this.messages.push({
      author: app.user.authData.userName,
      message: this.$('[name="message"]').val()
    });
  },

  render: function(){
    this.$el.html(template());

    return this;
  }

});