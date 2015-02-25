var _ = require('underscore'),
    Backbone = require('backbone'),
    app;

_.once(function(){
  app = {
    user: {},
    router: {},
    events: _({}).extend(Backbone.Events),
    utils: {

      validationTypes: {
        email_address: this.validateEmail,
        password: this.validatePassword
      },

      validatePassword: function(password){
        return true;
      },

      validateEmail: function(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      validateObj: function(value, key, list){
        if(this.obj[key].required && !_(value).isEmpty()){
          // debugger;

          // I don't know why this doesn't work
          // this.validationTypes[key](value)
        }
      },

      validate: function(obj, data){
        this.data = data;
        this.obj = obj;

        _(data).each(this.validateObj, this);
      }
    }
  };
})();

module.exports = app;