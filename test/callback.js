'use strict';
/**
 * @file callback test
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
