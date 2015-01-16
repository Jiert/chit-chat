var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    BeerList = require('../collections/beers.js'),

    BeerView = require('../views/beer_view'),
    FormView = require('../views/form_view');

module.exports = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, 'renderBeers', 'renderBeer');

    this.beers = new BeerList();
    this.listenTo(this.beers, {
      // TODO: This isn't the wy to go. We should only append new messages, 
      // rather than re-rendering each time we save just one message
      'sync': this.renderBeers,
      // 'add' : this.renderBeer
    });
  },

  renderBeers: function(event){
    console.log('renderBeers event' , event);

    this.$el.html('');
    this.beers.each(this.renderBeer);

    if (app.ref.getAuth()){
      this.renderForm();
    }

    // TODO: Sort out this massive memory leak!
    console.log('Holy memory leak! this.subviews: ' , this.subViews.length);
  },

  renderBeer: function(model){
    var beerView = this.createSubView(BeerView, {
      model: model,
      user: app.user.authData
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