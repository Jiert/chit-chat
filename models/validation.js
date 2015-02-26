var _ = require('underscore'),
    Backbone = require('backbone');

module.exports  = Backbone.Model.extend({

  isValid: true,

  initialize: function(options){
    _(this).bindAll('passwordVal', 'emailVal', 'valMethod');
  },

  passwordVal: function(password){
    return password.length > 0;
  },

  emailVal: function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  valMethod: function(value, key, list){
    this.isValid = this.isValid && this[key](value)
  },

  validate: function(){
    _(this.toJSON()).each(this.valMethod);
  },


});