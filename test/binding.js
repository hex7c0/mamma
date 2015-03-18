'use strict';
/**
 * @file binding test
 * @module mamma
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var mamma = require('..');
var assert = require('assert');

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
