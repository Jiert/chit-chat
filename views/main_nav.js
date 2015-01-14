var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

  events: {
    // 'click a'               : 'onLinkClick',
    'click #logout'         : 'onLogoutClick',
    'click #login'          : 'onLoginSubmit',
    'click #user-login > a' : 'onLoginClick',
    'click #create-account' : 'onCreateAccountClick',
  },

  initialize: function(options){
    _.bindAll(this, 'login');
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

  onLinkClick: function(event){
    console.log('onLinkClick')
    event.preventDefault();
    var route = $(event.currentTarget).attr('href');

    app.router.navigate(route, {trigger: true});
  },

  onCreateAccountClick: function(event){
    event.preventDefault();

    this.email    = this.$('input[name="email_address"]').val();
    this.userName = this.$('input[name="user_name"]').val();
    this.password = this.$('input[name="password"]').val();

    // this.registerEmail = this.$('input[name="exampleInputEmail1"]').val();
    // this.registerPassword = this.$('input[name="exampleInputPassword1"]').val();

    app.ref.createUser({
      email    : this.email,
      password : this.password
      // userName : this.userName
    }, _(function(error) {
      if (error === null) {
        console.log("User created successfully");
        debugger;
        app.ref.child("users").child(authData.uid).set(authData);
        this.login(this.email, this.password);
      } 
      else {
        console.log("Error creating user:", error);
      }
    }).bind(this));
  },

  // ref.onAuth(function(authData) {
  //   if (authData && isNewUser) {
  //     // save the user's profile into Firebase so we can list users,
  //     // use them in Security and Firebase Rules, and show profiles
  //     ref.child("users").child(authData.uid).set(authData);
  //   }
  // });


  login: function(email, password){
    app.ref.authWithPassword({
      email    : email,
      password : password
    }, _(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } 
      else {
        console.log("Authenticated successfully with payload:", authData);
      }
    }).bind(this));
  },
  
  render: function() {
    debugger;
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