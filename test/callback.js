'use strict';
/**
 * @file callback test
 * @module mamma
 * @package mamma
 * @subpackage test
 * @version 0.0.1
 * @author carniellifrancesco <carniellifrancesco@gmail.com>
 * @copyright gruppore 2014
 */

/*
 * initialize module
 */
// import
try {
  var mamma = require('..');
  var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
  console.error(MODULE_NOT_FOUND);
  process.exit(1);
}

/*
 * test module
 */
describe('callback', function() {

  var port = 3002;
  var id = 'Ciao';

  it('should test callback function when child die', function(done) {

    var server = mamma.createServer(port, {
      callback: function(err, id) {

        assert.equal(err, false);
        assert.equal(id, id);
        server.close();
        done();
      }
    });
    var client = mamma.createClient({
      port: port
    }, id, {
      autoReconnect: false
    });
    setTimeout(function() {

      client.end();
    }, 500);
  });
});
