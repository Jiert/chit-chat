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
    this.render();
  },

  onLinkClick: function(event){
    // debugger;
    event.preventDefault();
    var route = $(event.currentTarget).attr('href');


    console.log('route', route)

    app.router.navigate(route, {trigger: true});
  },

  onCreateAccountClick: function(event){
    event.preventDefault();

    var email = this.$('input[name="exampleInputEmail1"]').val(),
        password = this.$('input[name="exampleInputPassword1"]').val(),
        ref = new Firebase('https://blinding-torch-9943.firebaseio.com');

    ref.createUser({
      email    : email,
      password : password
    }, function(error) {
      if (error === null) {
        console.log("User created successfully");
      } else {
        console.log("Error creating user:", error);
      }
    });
  },

  render: function() {
    this.$el.html(template());

    this.$regPopover = this.$('#user-register > a');

    this.$regPopover.popover({
      placement: 'bottom',
      html: true,
      content: loginTemplate(),
      trigger: 'click'
    });

    return this;
  }

});