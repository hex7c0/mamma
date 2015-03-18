'use strict';
/**
 * @file binding example
 * @module mamma
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var mamma = require('..'); // use require('mamma') instead

var b = mamma.createBinding({
  port: 27017, // create binding with MongoDb server
}, 'mongoDb', {
  autoReconnect: false,
  callback: function() {

    console.error('mongo down');
  }
});
