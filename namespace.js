var _ = require('underscore'),
    Backbone = require('backbone'),
    app;

_.once(function(){
  app = {
    user: {},
    router: {},
    events: _({}).extend(Backbone.Events),
    utils: {
    	validate: function(obj, data){
    		_(data).each(function(value, key, list){
    			if(this[key].required && !_(value).isEmpty()){
    				debugger;
    			}
    			else {
    				return false;
    			}
    		}, obj)
    	}
    }
  };
})();

module.exports = app;