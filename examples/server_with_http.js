'use strict';
/**
 * @file server example
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

mamma.createServer(3000, {
  http: {
    port: 3001
  }
});
