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
// import
try {
  var mamma = require('..'); // use require('mamma')
} catch (MODULE_NOT_FOUND) {
  console.error(MODULE_NOT_FOUND);
  process.exit(1);
}

mamma.createServer(4000, {
  callback: function(err, id) {

    console.log(id);
  },
  http: {
    port: 4001
  }
});
