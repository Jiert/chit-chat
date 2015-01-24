var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../namespace'),

    template = require('../templates/modal.hbs');

module.exports = Backbone.View.extend({

  confirmText: 'Confirm',
  className: 'modal fade',
  modalBody: 'Hello World!',
  events: {
    'click .confirm' : 'onConfirm'
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

  // Please override 
  onLoaded  : function(){},
  onConfirm : function(){},
  onShow    : function(){},
  onShown   : function(){},
  onHide    : function(){},
  onHidden  : function(){
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
      title: 'title',
      confirmText : this.confirmText,
      modalBody: _.isFunction(this.modalBody) ? this.modalBody() : this.modalBody
    }));

    $('body').append(this.$el.modal());
    
    return this;
  }

});