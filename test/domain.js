'use strict';
/**
 * @file domain test
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
describe('domain', function() {

  var path = __dirname + '/foo.sock';

  describe('server', function() {

    it('should return an Error because no "listen"', function(done) {

      try {
        mamma.createServer();
      } catch (err) {
        assert.equal(err.message, 'listen required');
        done();
      }
    });
    it('should return Server obj', function(done) {

      var m = mamma.createServer(path);
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
        done();
      }
    });
    it('should return an Error because "connect" isn\'t an Object',
      function(done) {

        try {
          mamma.createClient('ciao');
        } catch (err) {
          assert.equal(err.message, 'connect required');
          done();
        }
      });
    it('should return an Error because no "id"', function(done) {

      try {
        mamma.createClient({
          path: path
        });
      } catch (err) {
        assert.equal(err.message, 'id required');
        done();
      }
    });
    it('should return Client obj and ENOENT', function(done) {

      var m = mamma.createClient({
        path: path
      }, 'ciao', {
        autoReconnect: false
      });
      assert.ok(m.end);
      m.on('error', function(err) {

        assert.ok(/connect ENOENT/.test(err.message));
        done();
      });
    });
  });

  describe('run', function() {

    it('should test client end', function(done) {

      var s = mamma.createServer(path);
      var c = mamma.createClient({
        path: path
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

      var s = mamma.createServer(path);
      var c = mamma.createClient({
        path: path
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
      var s = mamma.createServer(path);
      var c = mamma.createClient({
        path: path
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

      var s = mamma.createServer(path);
      var c1 = mamma.createClient({
        path: path
      }, 'multiple1', {
        autoReconnect: false
      });
      var c2 = mamma.createClient({
        path: path
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
