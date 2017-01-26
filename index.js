'use strict';
/**
 * @file mamma main
 * @module mamma
 * @subpackage main
 * @version 0.4.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var net = require('net');

/*
 * functions
 */
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
    callback: typeof options.callback === 'function' ? options.callback : false,
    http: false,
    https: false
  };
  if (typeof options.http === 'object') {
    my.http = {
      port: Number(options.http.port) || 3000,
      host: String(options.http.host || '127.0.0.1')
    };
  }
  if (typeof options.https === 'object') {
    my.https = options.https;
    my.https.port = Number(options.https.port) || 3000;
    my.https.host = String(options.https.host || '127.0.0.1');
  }

  var hosts = Object.create(null);
  var server = net.createServer(function(sock) {

    sock.setKeepAlive(true, my.keepalive); // https://en.wikipedia.org/wiki/Keepalive
    sock.on('data', function(buff) {

      if (sock._id) {
        hosts[sock._id] = {
          state: sock.readyState,
          beat: Date.now()
        };
      } else if (buff.length > 1) { // set client id
        var _id = String(buff);
        hosts[_id] = {
          state: sock.readyState,
          beat: Date.now()
        };
        sock._id = _id;
      }
      return;

    }).on('close', function(had_error) {

      if (sock._id) {
        hosts[sock._id] = {
          state: sock.readyState,
          beat: Date.now()
        };
      }
      // error hook [with client id]
      return my.callback !== false ? my.callback(had_error, sock._id) : null;
    });
  });

  if (options.host && typeof listen === 'number') { // tpc only
    server.listen(listen, options.host);
  } else {
    server.listen(listen);
  }

  if (my.http || my.https) {
    var web = function(req, res) {

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
    };
    if (my.http) {
      require('http').createServer(web).listen(my.http.port, my.http.host);
    }
    if (my.https) {
      require('https').createServer(my.https, web).listen(my.https.port,
        my.https.host);
    }
  }

  server._hosts = hosts; // hosts reference
  return server;
}
module.exports.createServer = createServer;

/**
 * createClient
 * 
 * @exports createClient
 * @function createClient
 * @see http://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener
 * @param {Object} connect - connect options
 * @param {String} id - child id
 * @param {Object} [opt] - various options. Check README.md
 * @return {Object}
 */
function createClient(connect, id, opt) {

  if (!connect || typeof connect !== 'object') {
    throw new TypeError('connect required');
  } else if (!id) {
    throw new TypeError('id required');
  }
  var options = opt || Object.create(null);
  var my = {
    autoReconnect: options.autoReconnect === false ? false : true,
    maxRetries: Number(options.maxRetries) || true,
    delay: Number(options.delay) || 2000
  };

  function autoReconnect() {

    if (my.maxRetries === true || --maxRetries > 0) {
      setTimeout(function() {

        if (connect.port) { // tpc
          client.connect(connect.port, connect.host);
        } else { // unix socket
          client.connect(connect.path);
        }
        return;
      }, my.delay);
    }
    return;
  }

  var client = net.createConnection(connect).on('connect', function() {

    return client.write(String(id));
  });
  if (my.autoReconnect) {
    client.on('close', autoReconnect);
  }
  client.close = function() {

    client.removeListener('close', autoReconnect);
    return client.end();
  };

  return client;
}
module.exports.createClient = createClient;

/**
 * createBinding
 * 
 * @exports createBinding
 * @function createBinding
 * @see http://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener
 * @param {Object} connect - connect options
 * @param {String} id - child id
 * @param {Object} [opt] - various options. Check README.md
 * @return {Object}
 */
function createBinding(connect, id, opt) {

  if (!connect || typeof connect !== 'object') {
    throw new TypeError('connect required');
  } else if (!id) {
    throw new TypeError('id required');
  }
  var options = opt || Object.create(null);
  var my = {
    autoReconnect: options.autoReconnect === false ? false : true,
    maxRetries: Number(options.maxRetries) || true,
    delay: Number(options.delay) || 2000,
    keepalive: Number(options.keepalive) || 2000,
    callback: typeof options.callback === 'function' ? options.callback : false,
  };

  function closed(had_error) {

    if (my.autoReconnect === true) {
      if (my.maxRetries === true || --maxRetries > 0) {
        setTimeout(function() {

          if (connect.port) { // tpc
            client.connect(connect.port, connect.host);
          } else { // unix socket
            client.connect(connect.path);
          }
          return;
        }, my.delay);
      }
    }
    // error hook [with client id]
    return my.callback !== false ? my.callback(had_error, id) : null;
  }

  var client = net.createConnection(connect);
  client.on('close', closed);
  client.setKeepAlive(true, my.keepalive);
  client.close = function() {

    client.removeListener('close', closed);
    return client.end();
  };

  return client;
}
module.exports.createBinding = createBinding;
