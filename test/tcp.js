'use strict';
/**
 * @file tcp test
 * @module task-manager
 * @package task-manager
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
describe('tcp', function() {

  var port = 3000;

  describe('server', function() {

    it('should return an Error because no "listen"', function(done) {

      try {
        mamma.createServer();
      } catch (err) {
        assert.equal(err.message, 'listen required');
      }
      done();
    });
    it('should return Server obj', function(done) {

      var m = mamma.createServer(port);
      assert.ok(m.close);
      m.close();
      done();
    });
  });

  describe('client', function() {

    it('should return an Error because no "connect"', function(done) {

      try {
        mamma.createClient();
      } catch (err) {
        assert.equal(err.message, 'connect required');
      }
      done();
    });
    it('should return an Error because "connect" isn\'t an Object', function(
                                                                             done) {

      try {
        mamma.createClient('ciao');
      } catch (err) {
        assert.equal(err.message, 'connect required');
      }
      done();
    });
    it('should return an Error because no "id"', function(done) {

      try {
        mamma.createClient({
          port: port
        });
      } catch (err) {
        assert.equal(err.message, 'id required');
      }
      done();
    });
    it('should return Client obj and ECONNREFUSED', function(done) {

      var m = mamma.createClient({
        port: port
      }, 'ciao', {
        autoReconnect: false
      });
      assert.ok(m.end);
      m.on('error', function(err) {

        assert.ok(/connect ECONNREFUSED/.test(err.message));
        done();
      });
    });
  });

  describe('run', function() {

    it('should test client end', function(done) {

      var s = mamma.createServer(port);
      var c = mamma.createClient({
        port: port
      }, 'should test client end', {
        autoReconnect: false
      });
      setTimeout(function() {

        c.end();
        s.close();
        done();
      }, 1000);
    });
    it('should test server end', function(done) {

      var s = mamma.createServer(port);
      var c = mamma.createClient({
        port: port
      }, 'should test server end', {
        autoReconnect: false
      });
      setTimeout(function() {

        s.close();
        assert.equal(c.writable, true);
        c.end();
        done();
      }, 1000);
    });
    it('should test keepalive probe with 10000 timeout', function(done) {

      this.timeout(10000);
      var s = mamma.createServer(port);
      var c = mamma.createClient({
        port: port
      }, 'should test keepalive probe with 10000 timeout', {
        autoReconnect: false
      });
      setTimeout(function() {

        assert.equal(c.destroyed, false);
        s.getConnections(function(err, count) {

          assert.equal(count, 1);
          c.end();
          s.close();
          done();
        });
      }, 9900);
    });
    it('should test multiple client', function(done) {

      var s = mamma.createServer(port);
      var c1 = mamma.createClient({
        port: port
      }, 'multiple1', {
        autoReconnect: false
      });
      var c2 = mamma.createClient({
        port: port
      }, 'multiple2', {
        autoReconnect: false
      });
      setTimeout(function() {

        s.getConnections(function(err, count) {

          assert.equal(count, 2);
          c1.end();
          c2.end();
          s.close();
          done();
        });
      }, 500);
    });
  });
});
