window.$ = window.jQuery = require('jquery');
window.Backbone = require('backbone');
window.Backbone.$ = $;
window._ = require('underscore');

$(function(){
  
  var Firebase = require('./libs/firebase'),
      backboneFire = require('./libs/backbonefire'),
      bootstrap = require('./libs/bootstrap'),
      app = require('./namespace'),
      MainRouter = require('./router');

  Backbone.View.prototype.createSubView = function(ViewClass, options) {
    if (!this.subViews) this.subViews = [];

    var view = new ViewClass(options);
    this.subViews.push(view);

    view.once('destroy', _(this.removeSubView).bind(this));
    return view;
  };

  Backbone.View.prototype.removeSubView = function(subview) {
    if (subview) this.subViews = _(this.subViews).without(subview);
  };

  Backbone.View.prototype.destroy = function() {
    if (this.subViews && this.subViews.length) {
      // creates a clone of the array for iterating over
      // needed because .each() can get confused if you
      // start modifying the array during the loop
      var iterator = this.subViews.slice(0); 

      _(iterator).each(function(subview) {
        subview.destroy();
      });
    }

    this.trigger('destroy', this);
    this.stopListening();
    this.teardown();
    this.remove();
    this.trigger('destroyed', this);
  };

  Backbone.View.prototype.teardown = function() {
    // replace this with your teardown logic, if any
  };

  app.router = new MainRouter();

  Backbone.history.start({pushState: true});

});