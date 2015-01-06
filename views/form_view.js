var _ = require('underscore'),
    Backbone = require('backbone'),
    BeerModel = require('../models/beer'),
    template = require('../templates/form.hbs');    

module.exports = Backbone.View.extend({

  events: {
    'click .addBeer': 'onAddBeer'
  },

  initialize: function(options){
    this.model = new BeerModel();
    this.beers = options.beers;
  },

  onAddBeer: function(event){
    this.beers.create({
      name: this.$('[name="name"]').val(),
      type: this.$('[name="type"]').val()
    });
  },

  render: function(){
    this.$el.html(template());

    return this;
  }

});