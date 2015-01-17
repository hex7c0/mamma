'use strict';
/**
 * @file binding test
 * @module mamma
 * @package mamma
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
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
describe('binding', function() {

  var port = 27017;
  var client;

  it('should create a connect with MongoDb', function(done) {

    client = mamma.createBinding({
      port: port
    }, 'mongo test').on('connect', function() {

      done();
    });
  });
  it('should test MongoDb port', function(done) {

    assert.equal(client.writable, true);
    assert.equal(client.remotePort, port);
    done();
  });
  it('should close binding', function(done) {

    client.close();
    assert.equal(client.writable, false);
    done();
  });
});
