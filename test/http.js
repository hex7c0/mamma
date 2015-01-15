'use strict';
/**
 * @file http test
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
  var request = require('superagent');
} catch (MODULE_NOT_FOUND) {
  console.error(MODULE_NOT_FOUND);
  process.exit(1);
}

/*
 * test module
 */
describe('http', function() {

  var port = 3000;
  var uri = 'http://127.0.0.1:3001';
  var server = mamma.createServer(port, {
    http: {
      port: port + 1
    }
  });

  it('should test empty page', function(done) {

    request.get(uri + '/').end(function(err, res) {

      assert.equal(err, null);
      assert.equal(res.statusCode, 200);
      assert.equal(res.text, '{}');
      done();
    });
  });
  it('should test / page with 1 child', function(done) {

    var c = mamma.createClient({
      port: port
    }, 'ciao 1');
    request.get(uri + '/').end(function(err, res) {

      assert.equal(err, null);
      assert.equal(res.statusCode, 200);
      var j = JSON.parse(res.text);
      assert.equal(j['ciao 1'].state, 'open');

      c.end();
      setTimeout(function() {

        request.get(uri + '/').end(function(err, res) {

          assert.equal(err, null);
          assert.equal(res.statusCode, 200);
          var j = JSON.parse(res.text);
          assert.equal(j['ciao 1'].state, 'closed');
          done();
        });
      }, 500);

    });
  });
  it('should test child page', function(done) {

    request.get(uri + '/ciao 1').end(function(err, res) {

      assert.equal(err, null);
      assert.equal(res.statusCode, 200);
      var j = JSON.parse(res.text);
      assert.equal(j.state, 'closed');
      done();
    });
  });
  it('should test another child page', function(done) {

    request.get(uri + '/ciao222').end(function(err, res) {

      assert.equal(err, null);
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
