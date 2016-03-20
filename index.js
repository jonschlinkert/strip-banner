/*!
 * strip-banner <https://github.com/jonschlinkert/strip-banner>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Released under the MIT license.
 */

'use strict';

var extract = require('extract-banner');

module.exports = function(str, options) {
  if (!str) return '';

  options = options || {};
  var banner = extract(str, options.configNames);
  if (banner === '') {
    return str;
  }

  if (options.keepProtected === true) {
    var m = /[^\s\w]+/.exec(banner);
    var lead = m ? m[0].trim() : '';
    if (lead[lead.length - 1] === '!') {
      return str;
    }
  }
  return str.replace(banner, '');
};
