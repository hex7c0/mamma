'use strict';
/**
 * @file mamma main
 * @module mamma
 * @package mamma
 * @subpackage main
 * @version 0.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
  var net = require('net');
} catch (MODULE_NOT_FOUND) {
  console.error(MODULE_NOT_FOUND);
  process.exit(1);
}

/**
 * createServer
 * 
 * @exports createServer
 * @function createServer
 * @param {Number|String} listen - listen type
 * @param {Object} [opt] - various options. Check README.md
 * @return {Object}
 */
function createServer(listen, opt) {

  if (!listen) {
    throw new TypeError('listen required');
  }

  var options = opt || Object.create(null);
  var my = {
    keepalive: Number(options.keepalive) || 2000,
    callback: typeof options.callback == 'function' ? options.callback : false,
    http: false
  };
  if (options.http) {
    my.http = {
      port: Number(options.http.port) || 3000,
      host: String(options.http.host || '127.0.0.1')
    };
  }

  var hosts = Object.create(null);
  var server = net.createServer(function(sock) {

    sock.setKeepAlive(true, my.keepalive); // https://en.wikipedia.org/wiki/Keepalive
    sock.on('data', function(buff) {

      if (sock._id !== undefined) {
        hosts[sock._id] = {
          state: sock.readyState,
          beat: Date.now()
        };
      } else if (buff.length > 1) {
        var _id = String(buff);
        hosts[_id] = {
          state: sock.readyState,
          beat: Date.now()
        };
        sock._id = _id;
      }
      return;
    }).on('close', function(had_error) {

      if (sock._id !== undefined) {
        hosts[sock._id] = {
          state: sock.readyState,
          beat: Date.now()
        };
        if (my.callback !== false) {
          my.callback(had_error, sock._id); // error hook
        }
      }
      return;
    });
  });
  server.on('error', function(err) {

    return console.error(err.message);
  }).listen(listen);

  if (my.http) {
    require('http').createServer(function(req, res) {

      var out = '';
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      var url = decodeURI(req.url);
      url = url.substr(1, url.length);
      if (url === '') {
        out = JSON.stringify(hosts);
      } else if (hosts[url] !== undefined) {
        out = JSON.stringify(hosts[url]);
      } else {
        res.statusCode = 404;
      }
      return res.end(out);
    }).listen(my.http.port, my.http.host);
  }

  return server;
}
module.exports.createServer = createServer;

/**
 * createClient
 * 
 * @exports createClient
 * @function createClient
 * @param {Number|String} listen - listen type
 * @param {String} id - child id
 * @return {Object}
 */
function createClient(connect, id) {

  if (!connect || typeof connect != 'object') {
    throw new TypeError('connect required');
  } else if (!id) {
    throw new TypeError('id required');
  }

  var client = net.createConnection(connect);
  client.on('error', function(err) {

    return console.error(err.message);
  }).on('connect', function() {

    return client.write(String(id));
  });

  return client;
}
module.exports.createClient = createClient;
