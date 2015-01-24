var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    template = require('../templates/modal.hbs');

module.exports = Backbone.View.extend({

  className: 'modal fade',
  modalBody: 'Hello World!',
  events: {},

  initialize: function(options){
    _.bindAll(this, 'onShow', 'onShown', 'onHide', 'onHidden');

    // I know this is a tad dangerous
    _(this).extend(options);
    
    this.listenTo(this.$el, {
      'show.bs.modal'   : this.onShow,
      'shown.bs.modal'  : this.onShown,
      'hide.bs.modal'   : this.onHide,
      'hidden.bs.modal' : this.onHidden,
      'loaded.bs.modal' : this.onLoaded
    });

    this.render();
  },

  onConfirmed: function(){
    console.log('base view onConfirmed');
  },

  // Please override 
  onShow  : function(){console.log('onshow');},
  onShown : function(){console.log('onshown');},
  onHide  : function(){console.log('onhide');},
  onHidden: function(){
    // I winder if this is best...
    console.log('onHidden');
    this.destroy();
  },
  onLoaded: function(){},

  show: function(){
    this.$el.modal('show');
  },

  render: function() {
    this.$el.html(template({
      title: 'title', 
      modalBody: _.isFunction(this.modalBody) ? this.modalBody() : this.modalBody
    }));

    $('body').append(this.$el.modal());
    
    return this;
  }

});