'use strict';
/**
 * @file autoReconnect test
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
describe('autoReconnect', function() {

  this.timeout(6000);

  var s;
  var port = 3004;
  var client = mamma.createClient({
    port: port
  }).on('error', function() {

    // pass
  });

  it('should test autoReconnect option after 3000ms', function(done) {

    client.removeAllListeners('connect');
    setTimeout(function() {

      client.on('connect', function() {

        s.close(function() {

          console.log('redis doesn\'t close server connection');
        });
        done();
      });
      s = mamma.createServer(port).on('listening', function() {

        console.log('server start');
      });
    }, 2900);
  });
  //  it('should test autoReconnect option after 3000ms', function(done) {
  //
  //    client.removeAllListeners('connect');
  //    setTimeout(function() {
  //
  //      client.on('connect', function() {
  //
  //        s.close(done);
  //      });
  //      s = mamma.createServer(port).on('listening', function() {
  //
  //        console.log('server start');
  //      });
  //    }, 2900);
  //  });
  it('should close client socket', function(done) {

    client.close();
    setTimeout(done, 2900);
  });
  it('shouldn\'t receive client socket', function(done) {

    s = mamma.createServer(port);
    setTimeout(function() {

      s.getConnections(function(err, count) {

        assert.equal(err, null);
        assert.equal(count, 0);
        done();
      });
    }, 2900);
  });
});
