/**
 * Erid's Library
 * Converter
 *
 * @author <a href="http://eridlabs.com">Elías Baldioceda</a>
 * @version 0.1
 */

(function(Erid, $, undefined) {

   /** 
    * Types parser
    *
    * @requires Erid 0.1+ 
    * @requires jQuery 1.6.2+ 
    * */
   Erid.Converter = {
      /**
       * Parse a Unicode string to a human readable text.
       * @param {String} ascii ASCII code string
       * @param {Number} [radix=16] Radix for the unicode format
       */
      unicode2Text: function(unicode, radix, separator) {
         var unicodeArr,
            text = '';

         radix = radix || 16;
         separator = separator || ' ';

         unicodeArr = unicode.split(separator);

         for(var i=0, m=unicodeArr.length; i < m; i++) {
            // Translate it from Hexadecimal Unicode
            try {
               text += String.fromCharCode(parseInt(unicodeArr[i], radix));
            } catch(exc) {
               text += 'ERROR';
            }
         }

         return text;
      },

      /**
       * Parse human readable text to a Unicode string.
       * @param {String} text Text string
       * @param {Number} [radix=16] Radix for the unicode format
       */
      text2Unicode: function(text, radix, separator) {
         var unicode = '';

         radix = radix || 16;
         separator = separator || ' ';

         for(var i=0, m=text.length; i < m; i++) {
            if(i > 0) {
               unicode += separator;
            }

            // Translate it to Hexadecimal Unicode
            try {
               unicode += (text[i].charCodeAt()).toString(radix);
            } catch(exc) {
               unicode += 'ERROR';
            }
         }

         return unicode.toUpperCase();
      }
   };
})(Erid, jQuery);
