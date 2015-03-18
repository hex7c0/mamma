'use strict';
/**
 * @file tcp server example
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

mamma.createServer(3000);
console.log('starting "mamma" TCP on port 3000');
