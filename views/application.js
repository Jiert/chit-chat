var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    template = require('../templates/application.hbs'),

    ContentView = require('../views/content'),
    NavView = require('../views/main_nav');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    _.bindAll(this, 'authDataCallback');
  },

  authenticateUser: function(){
    // Register the callback to be fired every time auth state changes
    app.ref = new Firebase("https://blinding-torch-9943.firebaseio.com");
    app.ref.onAuth(this.authDataCallback);
  },

  // Get Auth Synchronously
  // var ref = new Firebase("https://<your-firebase>.firebaseio.com");
  // var authData = ref.getAuth();
  // if (authData) {
  //   console.log("User " + authData.uid + " is logged in with " + authData.provider);
  // } else {
  //   console.log("User is logged out");
  // }

  authDataCallback: function(authData) {
    // app.events.trigger('authData', authData);
    if (authData) {
      app.user.authData = authData;
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } 
    else {
      // debugger;
      console.log("User is logged out");
    }

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