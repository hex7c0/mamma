# [mamma](https://github.com/hex7c0/mamma)

[![NPM version](https://img.shields.io/npm/v/mamma.svg)](https://www.npmjs.com/package/mamma)
[![Linux Status](https://img.shields.io/travis/hex7c0/mamma.svg?label=linux)](https://travis-ci.org/hex7c0/mamma)
[![Dependency Status](https://img.shields.io/david/hex7c0/mamma.svg)](https://david-dm.org/hex7c0/mamma)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/mamma.svg)](https://coveralls.io/r/hex7c0/mamma)

Offers baby monitors which will provide peace of mind to the new mother.
Open TCP or Unix domain socket and listen child [KA](https://en.wikipedia.org/wiki/Keepalive#TCP_keepalive) keepalive noises.
Alert (callback) when `close` event happen

## Installation

Install through NPM

```bash
npm install mamma
```
or
```bash
git clone git://github.com/hex7c0/mamma.git
```

## API

inside nodejs project
```js
var server = require('mamma').createServer;

var client = require('mamma').createClient;

var bind = require('mamma').createBinding; // bind to existing TCP server
```

### createServer(listen [, options])

#### listen

 - `listen`- **Number | String** Number for `TCP port`, String (path) for `sock` *(default "required")*

#### options

 - `keepalive` - **Number** Set initialDelay (in milliseconds) to set the delay between the last data packet received and the first keepalive probe *(default "2000")*
 - `callback`- **Function** Set callback when `close` event happen (return had_error,id) *(default "disabled")*
 - `http` - **Object** Enable http interface *(default "disabled")*
   - `port` - **Number** Set Web port *(default "3000")*
   - `host` - **String** Set Web host *(default "127.0.0.1")*
 - `https` - **Object** Enable https interface [extra options](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) *(default "disabled")*
   - `port` - **Number** Set Web port *(default "3000")*
   - `host` - **String** Set Web host *(default "127.0.0.1")*
 - `host` - **String** If the host is omitted, the server will accept connections directed to any IPv4 address (TCP only) *(default "omitted")*

### createClient(connect, id [, options])

#### connect

 - `connect`- **Object** [createConnection](http://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener) *(default "required")*

#### id

 - `id`- **String** Child id for callback *(default "required")*

#### options

 - `autoReconnect` - **Boolean** Set autoReconnect flag *(default "true")*
 - `maxRetries`- **Number** Set maxRetries for autoReconnect logic (true for unlimited) *(default "true")*
 - `delay` - **Number** Set millisecond delay from each try *(default "2000")*

### createBinding(connect, id [, options])

#### connect

 - `connect`- **Object** [createConnection](http://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener) *(default "required")*

#### id

 - `id`- **String** Child id for callback *(default "required")*

#### options

 - `autoReconnect` - **Boolean** Set autoReconnect flag *(default "true")*
 - `maxRetries`- **Number** Set maxRetries for autoReconnect logic (true for unlimited) *(default "true")*
 - `delay` - **Number** Set millisecond delay from each try *(default "2000")*
 - `keepalive` - **Number** Set initialDelay (in milliseconds) to set the delay between the last data packet received and the first keepalive probe *(default "2000")*
 - `callback`- **Function** Set callback `close` event happen (return had_error,id) *(default "disabled")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)
