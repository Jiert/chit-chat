var _ = require('underscore'),
    Backbone = require('backbone'),

    template = require('../templates/application.hbs'),

    BeerList = require('../collections/beers.js'),

    BeerView = require('../views/beer_view'),
    FormView = require('../views/form_view'),
    NavView = require('../views/main_nav');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    _.bindAll(this, 'onBeers', 'renderBeer');

    this.beers = new BeerList();
    // this.beers.on('sync', this.onBeers);

    this.render();
  },

  onBeers: function(){
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

  renderNav: function(){
    var navView = this.createSubView(NavView, {});

    this.$mainNav.html(navView.el);

    // body...
  },

  renderContent: function(){
    // body...
  },

  render: function() {
    // this.$el.html('Loading Beers...');
    this.$el.html(template());

    this.$mainNav = this.$('#main-nav');
    this.$content = this.$('#content');

    // debugger;

    this.renderNav();
    this.renderContent();

    return this;
  }

});