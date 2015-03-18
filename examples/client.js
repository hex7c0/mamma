'use strict';
/**
 * @file client example
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

mamma.createClient({
  port: 3000, // connect to server.js example
}, 'child 1');
