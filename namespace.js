var _ = require('underscore'),
    Backbone = require('backbone'),
    app;

_.once(function(){
  app = {
    user: {},
    router: {},
    events: _({}).extend(Backbone.Events)
  };
})();

module.exports = app;