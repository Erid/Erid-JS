/**
 * Erid's Library
 * Core
 *
 * @author <a href="http://eridlabs.com">Elías Baldioceda</a>
 * @version 0.1
 */

(function($, undefined) {

/**
 * @namespace Core of the library
 * @requires jQuery 1.6.2+
 */
var Erid = (function() {
   /** @private */
   var _loadedModules = new Array();
   /** @private */
   var _baseUrl = 'js/';

   /** @exports _Erid as Erid */
   var _Erid = {
      /**
       * Set the base URL for the JavaScript modules.
       * @param {String} baseUrl Path for the JavaScript modules.
       * @param {boolean} [ret] Returns or not the new baseUrl.
       */
      setBaseUrl: function(baseUrl, ret) {
         ret = ret || false;

         if(typeof baseUrl != 'string') return _baseUrl;

         // Don't allow cross-domain loading
         if(baseUrl.match(/\/\/:/)) return _baseUrl;

         // If the url doesn't end with a '/', add it
         if(baseUrl != '' && baseUrl.charAt(baseUrl.length-1) !== '/') {
            baseUrl += '/';
         }

         if(ret) return baseUrl;

         _baseUrl = baseUrl;
      },

      /**
       * Load a JavaScript file/module dynamically.
       * @param {String} moduleName Name of the module.
       * @param {Object} [options] Options for the loading module.
       * @param {Function} [callback] Callback function for when module is loaded.
       */
      load: function(moduleName, options, callback) {
         var version,
             baseUrl,
             defaults;

         defaults = {
            version: '',
            baseUrl: undefined
         };

         // Make it posible to use load(moduleName, callback)
         if(typeof options == 'function') {
            callback = options;
            options = {};
         }

         options = $.extend(defaults, options);

         // Don't load a module twice
         if(this.isLoaded(moduleName)) return;

         baseUrl = this.setBaseUrl(options.baseUrl, true);

         // Versioned modules should be named like Erid.module.1.2.js
         version = (options.version) ? '.' + options.version : '';
         
         _loadedModules.push(moduleName);
         $.holdReady(true);   // Prevent ready event from running

         // Exectute the JavaScript file
         $.getScript(baseUrl + moduleName + version + '.js', function() {
            $.holdReady(false);  // Allow ready event to run
            if(callback) callback();
         });
      },

      /**
       * Check if a certain module is already loaded.
       * @param {String} moduleName Name of the module to check.
       */
      isLoaded: function(moduleName) {
         for(var i = 0; i < _loadedModules.length; i++) {
            if(moduleName == _loadedModules[i]) {
               return true;
            }
         }

         return false;
      },
   };

   return _Erid;
})();

window.Erid = Erid;

})(jQuery);
