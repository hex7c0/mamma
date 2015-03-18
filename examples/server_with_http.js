'use strict';
/**
 * @file server with http example
 * @module mamma
 * @package mamma
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var mamma = require('..'); // use require('mamma') instead

mamma.createServer(4000, {
  callback: function(err, id) {

    console.log(id);
  },
  http: {
    port: 4001
  }
});

console.log('starting "mamma" TCP server on port 4000');
console.log('starting "mamma" HTTP server on port 4001');
