var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    template = require('../templates/modal.hbs');

module.exports = Backbone.View.extend({

  className: 'modal fade',
  modalBody: 'Hello World!',
  events: {
   'click .submit' : 'onSubmit' 
  },

  initialize: function(options){
    // I know this is a tad dangerous
    _(this).extend(options);
    
    
    // this.contentBody = options.content;
  },

  onConfirmed: function(){
    // debugger;
    console.log('base view onConfirmed');
  },



  show: function(){
    this.$el.modal();
  },

  render: function() {
    this.$el.html(template({
      title: 'title', 
      modalBody: _.isFunction(this.modalBody) ? this.modalBody() : this.modalBody
    }));
    
    // $('body').append(this.$el);

    // this.$el.modal();

    return this;
  }

});