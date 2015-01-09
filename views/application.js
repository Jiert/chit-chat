var _ = require('underscore'),
    Backbone = require('backbone'),

    template = require('../templates/application.hbs'),

    ContentView = require('../views/content'),
    NavView = require('../views/main_nav');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    this.render();
  },

  renderNav: function(){
    var navView = this.createSubView(NavView, {});

    this.$mainNav.html(navView.el);
  },

  renderContent: function(){
    var contentView = this.createSubView(ContentView, {});

    this.$content.html(contentView.render().el);
  },

  render: function() {
    this.$el.html(template());

    this.$mainNav = this.$('#main-nav');
    this.$content = this.$('#content');

    this.renderNav();
    this.renderContent();

    return this;
  }

});