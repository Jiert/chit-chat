var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/sidebar_nav_room.hbs'); 

module.exports = Backbone.View.extend({

  tagName: 'li',
  events: { 'click': 'onClick' },

  initialize: function(options){
    this.listenTo( this.model, 'change', this.render );
  },

  onClick: function(event){
    event.preventDefault();
    if (this.model.get('open')) return;
    this.model.set({ open: true });
  },

  render: function(){
    console.log('rendering room nav')
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});