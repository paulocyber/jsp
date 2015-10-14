(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var module, exports;

(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/mrt_exports/packages/mrt_exports.js                                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
(function () {                                                                      // 1
                                                                                    // 2
////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                            //    // 4
// packages/mrt:exports/exports.js                                            //    // 5
//                                                                            //    // 6
////////////////////////////////////////////////////////////////////////////////    // 7
                                                                              //    // 8
// Pass the global object by reference                                        // 1  // 9
(function (global) {                                                          // 2  // 10
  // Initialize an empty module object to be referenced                       // 3  // 11
  module = {};                                                                // 4  // 12
                                                                              // 5  // 13
  // Set getters and setters for `module.exports` and the `exports` alias     // 6  // 14
  var name = 'exports';                                                       // 7  // 15
  if (typeof Object.getOwnPropertyDescriptor(module, name) === 'undefined') { // 8  // 16
    // Extend the global namespace from the local object                      // 9  // 17
    Object.defineProperty(module, name, {                                     // 10
      // Set a setter to handle the object's properties                       // 11
      set: function (props) {                                                 // 12
        // Export each local variable to the `this` object.                   // 13
        for (var prop in props) {                                             // 14
          // Make sure we aren't inheriting any prototype properties          // 15
          if (props.hasOwnProperty(prop)) {                                   // 16
            global[prop] = props[prop];                                       // 17
          }                                                                   // 18
        }                                                                     // 19
      },                                                                      // 20
      get: function () {                                                      // 21
        return global;                                                        // 22
      }                                                                       // 23
    });                                                                       // 24
  }                                                                           // 25
  // Set `exports` to the original value of `module.exports`                  // 26
  exports = module.exports;                                                   // 27
})((function () {                                                             // 28
  // Pass top-level (global) object to the above function                     // 29
  return (function() {                                                        // 30
    return this;                                                              // 31
  }).call(null); // Force `this` to be the top-level object.                  // 32
})());                                                                        // 33
                                                                              // 34
////////////////////////////////////////////////////////////////////////////////    // 43
                                                                                    // 44
}).call(this);                                                                      // 45
                                                                                    // 46
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:exports'] = {
  module: module,
  exports: exports
};

})();

//# sourceMappingURL=mrt_exports.js.map
