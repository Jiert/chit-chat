var _ = require('underscore'),
    Backbone = require('backbone');

module.exports  = Backbone.Model.extend({

  initialize: function(options){
    _(this).bindAll('password', 'email', 'valMethod');

    this.set('valid', true);
    this.errors = {};
  },

  isValid: function(){
    return this.get('valid');
  },

  password: function(password){
    return password.length > 0;
  },

  email: function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  valMethod: function(data, key, list){
    var valid = this.get('valid') && this[data.type](data.value)

    this.set('valid', valid);

    if (!valid){
      this.errors[key] = data.value
    }
  },

  validate: function(){
    _(this.get('validation')).each(this.valMethod);
  },


});