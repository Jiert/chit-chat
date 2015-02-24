var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    template = require('../templates/modal.hbs');

module.exports = Backbone.View.extend({

  title       : 'Modal', 
  confirmText : 'Confirm',
  className   : 'modal fade',
  modalBody   : 'Hello World!',
  showCancel  : true, 

  events: {
    'click .confirm' : 'onConfirm',
    'keydown' : 'onKeyDown'
  },

  initialize: function(options){
    _.bindAll(this, 'onShow', 'onShown', 'onHide', 'onHidden');

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

  onKeyDown: function(event){
    if (event.keyCode === 13){
      event.preventDefault();
      this.onConfirm();
    }
  },

  // Please override 
  onLoaded  : function(){},
  onConfirm : function(){},
  onShow    : function(){},

  onShown   : function(){
    this.$el.find('input').first().focus();
  },

  onHide    : function(){},
  onHidden  : function(){
    // Be sure to include this in any overrides
    this.destroy();
  },

  show: function(){
    this.$el.modal('show');
  },

  hide: function(){
    this.$el.modal('hide');
  },

  render: function() {
    this.$el.html(template({
      title       : this.title,
      confirmText : this.confirmText,
      showCancel  : this.showCancel,
      modalBody   : _.isFunction(this.modalBody) ? this.modalBody() : this.modalBody
    }));

    $('body').append(this.$el.modal());
    return this;
  }

});