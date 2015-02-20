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
    console.log('on room click');
    this.model.set({ open: !this.model.get('open') });
  },

  render: function(){
    console.log('rendering room nav')
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});