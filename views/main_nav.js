var _ = require('underscore'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

  events: {
    'click #create-account' : 'onCreateAccountClick'
  },

  initialize: function(options){
    this.render();
  },

  onCreateAccountClick: function(event){
    event.preventDefault();
    console.log('onCreateAccountClick')
  },

  render: function() {
    this.$el.html(template());

    this.$regPopover = this.$('#user-register > a');

    this.$regPopover.popover({
      placement: 'bottom',
      html: true,
      content: loginTemplate(),
      trigger: 'click'
    })

    return this;
  }

});