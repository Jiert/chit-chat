var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #logout'         : 'onLogoutClick',
    'click #login'          : 'onLoginSubmit',
    'click #user-login > a' : 'onLoginClick',
    'click #create-account' : 'onCreateAccountClick',
  },

  initialize: function(options){
    _.bindAll(this, 'login', 'onLogin', 'onSaveUser', 'onAccountCreated');
  },

  onLogoutClick: function(){
    app.ref.unauth();
  },

  onLoginClick: function(){
    this.$('.modal').modal();
  },

  onLoginSubmit: function(){
    event.preventDefault();

    var email = this.$('input[name="exampleInputEmail1"]').val(),
        password = this.$('input[name="exampleInputPassword1"]').val();

    this.login(email, password);
  },

  onCreateAccountClick: function(event){
    event.preventDefault();

    this.email    = this.$('input[name="email_address"]').val();
    this.userName = this.$('input[name="user_name"]').val();
    this.password = this.$('input[name="password"]').val();

    // TODO: 
    // * validate against existing user names
    // * trim user name

    app.ref.createUser({
      email    : this.email,
      password : this.password
    }, this.onAccountCreated); 
  },

  onAccountCreated: function(error){
    if (error === null) {
      console.log("User created successfully");
      this.isNewUser = true;
      this.login(this.email, this.password);
    } 
    else {
      console.log("Error creating user:", error);
    }
  },

  login: function(email, password){
    app.ref.authWithPassword({
      email    : email,
      password : password
    }, this.onLogin); 
  },
  
  onLogin: function(error, authData){
    if (error) {
      console.log("Login Failed!", error);
    } 
    else if (authData){
      if (this.isNewUser) {
        _.extend(authData, { userName: this.userName});

        app.ref.child('users').child(authData.uid).set(authData, this.onSaveUser);
      }
      console.log("Authenticated successfully with payload:", authData);
    }
  },

  onSaveUser: function(error){
    if (error){
      console.log('Error creating user: ', error);
    }
    else {
      console.log('User saved successfully');
      this.isNewUser = false;
    }     
  },

  render: function() {
    this.$el.html(template({
      authData: app.ref.getAuth()
    }));

    this.$('#user-register > a').popover({
      placement: 'bottom',
      html: true,
      content: loginTemplate({ login: false}),
      trigger: 'click'
    });

    // this.$('#user-login > a').popover({
    //   placement: 'bottom',
    //   html: true,
    //   content: loginTemplate({ login: true }),
    //   trigger: 'click'
    // });

    this.$loginModal = this.$('.modal').modal({ show: false });

    return this;
  }

});