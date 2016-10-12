'use strict';
const Hapi = require('hapi');
const localhostips = require('localhostips');
var api = require('./handlers/api');
const webServer = new Hapi.Server();
const webPost = 3333;
const udpServerPort = 2222;

//udp server
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(udpServerPort);

//web server

webServer.connection({
    host: '0.0.0.0',
    port: webPost
});
webServer.register(require('inert'), (err) => {
    webServer.route({
        method: 'POST',
        path: '/api/setColor',
        handler: api
    });
    webServer.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'web',
                listing: true
            }
        }
    });
});
webServer.start((err) => {
    if (err) {
        throw err;
    }
    localhostips().map(function (ip) {
        console.log('webServer running at ', ip, ':', webPost);
    });

});