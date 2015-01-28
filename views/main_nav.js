var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),

    ModalView = require('../views/modal'),

    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs'),
    registerTemplate = require('../templates/register.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #logout'            : 'onLogoutClick',
    'click #login'             : 'onLoginSubmit',
    'click #user-login > a'    : 'onLoginClick',
    'click #user-register > a' : 'onRegisterClick',
    // 'click #create-account'    : 'onCreateAccountClick',
  },

  initialize: function(options){
    _.bindAll(this, 'login', 'onLogin', 'onSaveUser', 'onAccountCreated', 'onLoginSubmit', 'onCreateAccountSubmit');
  },

  onLogoutClick: function(){
    app.ref.unauth();
  },

  onLoginClick: function(){
    this.modalView = this.createSubView( ModalView, {
      title       : 'Login',
      onConfirm   : this.onLoginSubmit,
      modalBody   : loginTemplate,
      confirmText : 'Login',
      showCancel  : false 
    });
  },

  onRegisterClick: function(){
    this.registerModal = this.createSubView( ModalView, {
      title       : 'Register',
      onConfirm   : this.onCreateAccountSubmit,
      modalBody   : registerTemplate,
      confirmText : 'Create Account',
      showCancel  : false 
    });
  },

  onLoginSubmit: function(){
    this.modalView.$('.confirm').text('Working...').attr('disabled', 'disabled');

    var email = this.modalView.$('input[name="email_address"]').val(),
        password = this.modalView.$('input[name="password"]').val();

    this.login(email, password);
  },

  onCreateAccountSubmit: function(event){
    this.registerModal.$('.confirm').text('Working...').attr('disabled', 'disabled');

    this.email    = this.registerModal.$('input[name="email_address"]').val();
    this.userName = this.registerModal.$('input[name="user_name"]').val();
    this.password = this.registerModal.$('input[name="password"]').val();

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
      this.registerModal.hide();
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
    this.modalView && this.modalView.hide();

    if (error) {
      console.log("Login Failed!", error);
    } 
    else if (authData){
      if (this.isNewUser) {
        _.extend(authData, { userName: this.userName });

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
    // TODO: authData should be a model
    var auth = app.ref.getAuth();

    this.$el.html(template({
      authData: auth,
      userName: app.user ? app.user.get('userName') : undefined 
    }));

    // this.$('#user-register > a').popover({
    //   placement: 'bottom',
    //   html: true,
    //   content: registerTemplate(),
    //   trigger: 'click'
    // });

    return this;
  }

});