var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click a' : 'onLinkClick',
    'click #create-account' : 'onCreateAccountClick'
  },

  initialize: function(options){
    _.bindAll(this, 'onLogin');

    this.ref = new Firebase('https://blinding-torch-9943.firebaseio.com');
    this.render();
  },

  onLinkClick: function(event){
    event.preventDefault();
    var route = $(event.currentTarget).attr('href');

    app.router.navigate(route, {trigger: true});
  },

  onCreateAccountClick: function(event){
    event.preventDefault();

    this.registerEmail = this.$('input[name="exampleInputEmail1"]').val();
    this.registerPassword = this.$('input[name="exampleInputPassword1"]').val();

    this.ref.createUser({
      email    : this.registerEmail,
      password : this.registerPassword
    }, _(function(error) {
      if (error === null) {
        console.log("User created successfully");
        this.onLogin(this.registerEmail, this.registerPassword);
      } 
      else {
        console.log("Error creating user:", error);
      }
    }).bind(this));
  },

  onLogin: function(email, password){
    this.ref.authWithPassword({
      email    : email,
      password : password
    }, _(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } 
      else {
        console.log("Authenticated successfully with payload:", authData);
        this.render();
      }
    }).bind(this));

  },
  
  render: function() {
    this.$el.html(template());

    this.$('#user-register > a').popover({
      placement: 'bottom',
      html: true,
      content: loginTemplate(),
      trigger: 'click'
    });

    return this;
  }

});