var _ = require('underscore'),
    Backbone = require('backbone'),

    BeerList = require('../collections/beers.js'),

    BeerView = require('../views/beer_view'),
    FormView = require('../views/form_view');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    _.bindAll(this, 'renderBeers', 'renderBeer');

    this.beers = new BeerList();
    this.listenTo(this.beers, {
      'sync': this.renderBeers
    });
  },

  renderBeers: function(){
    this.$el.html('');
    this.beers.each(this.renderBeer);

    this.renderForm();
  },

  renderBeer: function(model){
    var beerView = this.createSubView(BeerView, {
      model: model
    });

    this.$el.append(beerView.render().el);
  },  

  renderForm: function(){
    var formView = this.createSubView(FormView, { beers: this.beers });
    this.$el.append(formView.render().el);
  },

  render: function() {
    this.$el.html('Loading Beers...');

    console.log('content render');

    // TODO: There's got to be a better way to do 
    // this in tandom with listenTo: sync
    if (this.beers.length){
      this.renderBeers();
    }
    return this;
  }

});