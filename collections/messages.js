var _ = require('underscore'),
    Backbone = require('backbone'),
    Message = require('../models/message');
    
module.exports = Backbone.Firebase.Collection.extend({

  initialize: function(models, options){
    // this.url = 'https://blinding-torch-9943.firebaseio.com/rooms/'+ options.room +'/messages';
    this.url = 'https://blinding-torch-9943.firebaseio.com/messages/' + options.room;
    debugger;
  },

  // url: 'https://blinding-torch-9943.firebaseio.com/messages',
  model: Message,
});


// {
//     // rooms contains only meta info about each room
//     // stored under the room's unique ID
//     "rooms": {
//       "one": {
//         "name": "room alpha",
//         "type": "private"
//       },
//       "two": { ... },
//       "three": { ... }
//     },

//     // room members are easily accessible (or restricted)
//     // we also store these by room ID
//     "members": {
//       // we'll talk about indices like this below
//       "one": {
//         "mchen": true,
//         "hmadi": true
//       },
//       "two": { ... },
//       "three": { ... }
//     },

//     // messages are separate from data we may want to iterate quickly
//     // but still easily paginated and queried, and organized by room ID
//     "messages": {
//       "one": {
//         "m1": { "sender": "mchen", "message": "foo" },
//         "m2": { ... },
//         "m3": { ... }
//       },
//       "two": { ... },
//       "three": { ... }
//     }
//   }