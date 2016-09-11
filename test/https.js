'use strict';
/**
 * @file http test
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
var request = require('superagent');
var fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // force

/*
 * test module
 */
describe('https', function() {

  var port = 3000;
  var uri = 'https://127.0.0.1:3002/';
  var server;

  before(function(done) {

    server = mamma.createServer(port, {
      https: {
        port: port + 2,
        key: fs.readFileSync(__dirname + '/test_key.pem'),
        cert: fs.readFileSync(__dirname + '/test_cert.pem')
      }
    });
    done();
  });

  it('should test empty page', function(done) {

    request.get(uri).end(function(err, res) {

      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      assert.equal(res.text, '{}');
      done();
    });
  });
  it('should test / page with 1 child', function(done) {

    var c = mamma.createClient({
      port: port
    }, 'child 1', {
      autoReconnect: false
    });
    setTimeout(function() {

      request.get(uri).end(function(err, res) {

        assert.ifError(err);
        assert.equal(res.statusCode, 200);
        var j = JSON.parse(res.text);
        assert.equal(j['child 1'].state, 'open');

        c.end();
        setTimeout(function() {

          request.get(uri).end(function(err, res) {

            assert.ifError(err);
            assert.equal(res.statusCode, 200);
            var j = JSON.parse(res.text);
            assert.equal(j['child 1'].state, 'closed');
            done();
          });
        }, 500);

      }, 500);
    });
  });
  it('should test child page', function(done) {

    request.get(uri + 'child 1').end(function(err, res) {

      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      var j = JSON.parse(res.text);
      assert.equal(j.state, 'closed');
      done();
    });
  });
  it('should test another child page', function(done) {

    request.get(uri + 'ciao222').end(function(err, res) {

      assert.notEqual(err, null);
      assert.equal(err.response.statusCode, 404);
      assert.equal(res.statusCode, 404);
      assert.equal(res.text, '');
      done();
    });
  });
  it('should close server', function(done) {

    server.close();
    done();
  });
});
