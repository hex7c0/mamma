# [mamma](http://supergiovane.tk/#/mamma)

[![NPM version](https://badge.fury.io/js/mamma.svg)](http://badge.fury.io/js/mamma)
[![Build Status](https://travis-ci.org/hex7c0/mamma.svg)](https://travis-ci.org/hex7c0/mamma)
[![Dependency Status](https://david-dm.org/hex7c0/mamma/status.svg)](https://david-dm.org/hex7c0/mamma)

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
```

### createServer(listen,[options])

#### listen

 - `listen`- **Number | String** Number for `TCP port`, String (path) for `sock` *(default "required")*

#### options

 - `keepalive` - **Number** Set initialDelay (in milliseconds) to set the delay between the last data packet received and the first keepalive probe *(default "2000")*
 - `callback`- **Function** Set callback `close` event happen (return had_error,id) *(default "disabled")*
 - `http` - **Object** Enable http interface *(default "disabled")*
   - `port` - **Number** Set Web port *(default "3000")*
   - `host` - **String** Set Web host *(default "127.0.0.1")*
 - `https` - **Object** Enable https interface [extra options](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) *(default "disabled")*
   - `port` - **Number** Set Web port *(default "3000")*
   - `host` - **String** Set Web host *(default "127.0.0.1")*
 - `console`- **Boolean** Display error event to console *(default "false")*

### createClient(connect,id,[options])

#### connect

 - `connect`- **Object** [createConnection](http://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener) *(default "required")*

#### id

 - `id`- **String** Child id for callback *(default "required")*

#### options

 - `console`- **Boolean** Display error event to console *(default "false")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/mamma/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)
