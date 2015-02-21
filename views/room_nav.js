var _ = require('underscore'),
    app = require('../namespace'),
    Backbone = require('backbone'),
    template = require('../templates/sidebar_nav_room.hbs'); 

module.exports = Backbone.View.extend({

  tagName: 'li',
  events: { 'click': 'onClick' },

  initialize: function(options){
    this.listenTo(app.openRooms, {
      'add': this.render,
      'remove': this.render
    });
  },

  onClick: function(event){
    event.preventDefault();

    var contains = app.openRooms.contains(this.model);

    if (contains){
      app.openRooms.remove(this.model);
    }
    else {
      app.openRooms.add(this.model)
    }
  },

  render: function(model){
    // Don't carry on with render if the changed model wasn't this.model
    if (model && !_(model).isEqual(this.model)) return

    console.log('room nav rnder')
    this.$el.html(template({
      active: app.openRooms.contains(this.model),
      model : this.model.toJSON()
    }));

    return this;
  }
});