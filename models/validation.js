var _ = require('underscore'),
    Backbone = require('backbone');

module.exports  = Backbone.Model.extend({

  initialize: function(options){
    _(this).bindAll('passwordVal', 'emailVal', 'valMethod');

    this.set('valid', true);
    this.errors = {};
  },

  isValid: function(){
    return this.get('valid');
  },

  passwordVal: function(password){
    return password.length > 0;
  },

  emailVal: function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  valMethod: function(value, key, list){
    debugger;
    var valid = this.get('valid') && this[key](value)

    this.set('valid', valid);

    debugger;

    if (!valid){
      this.errors[key] = value
    }
  },

  validate: function(){
    _(this.get('validation')).each(this.valMethod);
  },


});