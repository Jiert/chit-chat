var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    template = require('../templates/modal.hbs');

module.exports = Backbone.View.extend({

  className: 'modal fade',
  events: {},

  initialize: function(options){
    this.contentBody = options.content;
    // debugger;
  },

  show: function(){
    this.$el.modal();
  },

  render: function() {
    this.$el.html(template({
      title: 'title', 
      content: this.contentBody()
    }));
    
    // $('body').append(this.$el);

    // this.$el.modal();

    return this;
  }

});