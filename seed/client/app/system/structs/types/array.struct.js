'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCT ARRAY
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs')
  .service('APP_NAME.System.Structs.Array', function() {
    var Struct = {};

    //
    // ARRAY INSTANCE
    //------------------------------------------------------------------------------------------//
    // @description
    Struct.Array = function(spec) {
      this.data = [];

      for(var method in Struct.methods) {
        this.data[method] = Struct.methods[method].bind(this.data);
      }

      return this.data;
    };

    //
    // ARRAY METHODS
    //------------------------------------------------------------------------------------------//
    // @description
    Struct.methods = {};

    /**
     * Clean
     */
    Struct.methods.clean = function() {
      this.length = 0;
      return this;
    };

    /**
     * Fill
     * @param data
     */
    Struct.methods.fill = function(data) {
      var self = this;

      data.forEach(function(itm) {
        self.push(itm);
      });

      return this;
    };

    return Struct.Array;
  });