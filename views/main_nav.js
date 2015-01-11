var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click a' : 'onLinkClick',
    'click #create-account' : 'onCreateAccountClick',
    'click #logout': 'onLogout'
  },

  initialize: function(options){
    _.bindAll(this, 'login');
    // app.ref.onAuth(this.render);

    // this.listenTo(app.events, {
    //   'authData': this.onAuthCallback
    // });

    // this.render();
  },

  onLogout: function(){
    app.ref.unauth();
  },

  onLinkClick: function(event){
    event.preventDefault();
    var route = $(event.currentTarget).attr('href');

    app.router.navigate(route, {trigger: true});
  },

  // onAuthCallback: function(authData){
  //   // debugger;
  //   // this.render();
  // },

  onCreateAccountClick: function(event){
    event.preventDefault();

    this.registerEmail = this.$('input[name="exampleInputEmail1"]').val();
    this.registerPassword = this.$('input[name="exampleInputPassword1"]').val();

    app.ref.createUser({
      email    : this.registerEmail,
      password : this.registerPassword
    }, _(function(error) {
      if (error === null) {
        console.log("User created successfully");
        this.login(this.registerEmail, this.registerPassword);
      } 
      else {
        console.log("Error creating user:", error);
      }
    }).bind(this));
  },

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
    // debugger;
    this.$el.html(template({
      authData: app.ref.getAuth()
    }));

    this.$('#user-register > a').popover({
      placement: 'bottom',
      html: true,
      content: loginTemplate(),
      trigger: 'click'
    });

    return this;
  }

});