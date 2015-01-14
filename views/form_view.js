var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    BeerModel = require('../models/beer'),
    template = require('../templates/form.hbs');    

module.exports = Backbone.View.extend({

  events: {
    // 'click .addBeer': 'onAddBeer'
    'click #submit-message' : 'onMessageSubmit'
  },

  initialize: function(options){
    this.model = new BeerModel();
    this.beers = options.beers;

    this.messages = app.ref.child('messages');
  },

  onMessageSubmit: function(event){
    event.preventDefault();

    debugger;

    this.messages.push({
      author: 'jared',
      message: this.$('[name="message"]').val()
    });
  },

  // var postsRef = ref.child("posts");
  //   postsRef.push({
  //     author: "gracehop",
  //     title: "Announcing COBOL, a New Programming Language"
  //   });
  //   postsRef.push({
  //     author: "alanisawesome",
  //     title: "The Turing Machine"
  //   });

  // usersRef.child("alanisawesome").set({
  //   date_of_birth: "June 23, 1912",
  //   full_name: "Alan Turing"
  // });
  // usersRef.child("gracehop").set({
  //   date_of_birth: "December 9, 1906",
  //   full_name: "Grace Hopper"
  // });


  // onAddBeer: function(event){
  //   this.beers.create({
  //     name: this.$('[name="name"]').val(),
  //     type: this.$('[name="type"]').val()
  //   });
  // },

  render: function(){
    this.$el.html(template());

    return this;
  }

});