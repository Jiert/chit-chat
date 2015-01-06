var _ = require('underscore'),
    Backbone = require('backbone'),
    BeerModel = require('../models/beer');

module.exports = Backbone.View.extend({
  
  template : _('\
    <label>Name</label>\
    <input type="text" name="name"></input>\
    <label>Type</label>\
    <input type="text" name="type"></input>\
    <button class="btn addBeer">Submit</button>\
  ').template(),

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
    this.$el.html(this.template());

    return this;
  }

});