var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    ModalView = require('../views/modal'),
    loginTemplate = require('../templates/login.hbs'),
    ValidationModel = require('../models/validation'),
    registerTemplate = require('../templates/register.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #logout'            : 'onLogoutClick',
    'click #login'             : 'onLoginSubmit',
    'click #user-login > a'    : 'onLoginClick',
    'click #user-register > a' : 'onRegisterClick',
  },

  initialize: function(options){
    _.bindAll( this, 
      'login', 'onLogin', 'onSaveUser', 
      'onAccountCreated', 'onLoginSubmit', 
      'onCreateAccountSubmit', 'toggleMessage');
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
    // Kill all of the modals existing tooltips
    // This doens't work
    // this.modalView.$('input').tooltip('destroy');


    // Should this all be taken care of in the modal class?
    this.loginModel = void 0;

    this.loginModel = new ValidationModel({
      validation: {
        email_address: {
          required : true,
          value    : this.modalView.$('input[name="email_address"]').val(),
          type     : 'email'
        },
        password: {
          required : true,
          value    : this.modalView.$('input[name="password"]').val(),
          type     : 'password'
        }
      }
    })

    this.loginModel.validate();

    if (this.loginModel.isValid()){
      // TODO: This hurts. These values should be easier to get to
      var email = this.loginModel.get('validation').email_address.value,
          password = this.loginModel.get('validation').password.value;

      this.modalView.$('.confirm').text('Working...').attr('disabled', 'disabled');
      this.login(email, password);
    }
    else {
      var keys = this.loginModel.errors && _(this.loginModel.errors).keys();
      _(keys).each(this.toggleMessage);
    }
  },

  toggleMessage: function(input){
    console.log('toggleMessage')
    var $el = this.modalView.$('[name="'+input+'"]');

    $el.tooltip({
      // TODO:  This.... seems brittle
      title: this.loginModel.errors[input].message,
      trigger: 'focus'
    })

    $el.tooltip('show')
  },

  onCreateAccountSubmit: function(event){
    this.registerModal.$('.confirm').text('Working...').attr('disabled', 'disabled');

    this.email    = this.registerModal.$('input[name="email_address"]').val();
    this.userName = this.registerModal.$('input[name="user_name"]').val();
    this.password = this.registerModal.$('input[name="password"]').val();

    // TODO: 
    // * validate against existing user names
    // * trim user name
    // * validate against blank values, and types (email address)

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

    return this;
  }

});