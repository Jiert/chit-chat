var _ = require('underscore'),
    Backbone = require('backbone'),
    template = require('../templates/main_nav.hbs'),
    loginTemplate = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(options){
    this.render();
  },

  render: function() {
    this.$el.html(template());

    this.$regPopover = this.$('#user-register > a');

    this.$regPopover.popover({
      placement: 'bottom',
      html: true,
      content: loginTemplate(),
      trigger: 'click',
      // container: 'body'

    })

    return this;
  }

});