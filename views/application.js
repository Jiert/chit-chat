var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    RoomsCollection = require('../collections/rooms'),

    template = require('../templates/application.hbs'),

    ContentView = require('../views/content'),
    NavView = require('../views/main_nav');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    _.bindAll(this, 'authDataCallback', 'onUser');
  },

  authenticateUser: function(){
    // Register the callback to be fired every time auth state changes
    // TODO: we should be making all these references with models / collectons

    app.ref = new Firebase("https://blinding-torch-9943.firebaseio.com");
    app.ref.onAuth(this.authDataCallback);

    // I'm putting this here so it can be listened to by any view in the app
    app.rooms = new RoomsCollection();
  },

  authDataCallback: function(authData) {
    if (authData) {
      // TODO: find a better way to find users undrer app.ref
      // This needs to be a model
      var user = new Firebase('https://blinding-torch-9943.firebaseio.com/users/' + authData.uid);
      user.once('value', this.onUser);
    } 
    else {
      delete app.user.authData;
      console.log("User is logged out");
      this.renderApp();
    }
  },

  onUser: function(snap){
    app.user.authData = snap.val();
    console.log('User logged in: ', app.user.authData);

    // I question if this is the best thing to do
    this.renderApp();
  },

  renderApp: function(){
    this.renderNav();
    this.renderContent();
  },

  renderNav: function(){
    var navView = this.createSubView(NavView, {});

    this.$mainNav.html(navView.render().el);
  },

  renderContent: function(){
    var contentView = this.createSubView(ContentView, {});

    this.$content.html(contentView.render().el);
  },

  render: function() {
    console.log('application view render');
    this.$el.html(template());

    this.$mainNav = this.$('#main-nav');
    this.$content = this.$('#content');

    this.authenticateUser();

    return this;
  }

});