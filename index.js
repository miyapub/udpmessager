#!/usr/bin/env node
'use strict';
const Hapi = require('hapi');
const jsonio = require('jsonio');
const localhostips = require('localhostips');
var api_post = require('./handlers/post');
var api_get = require('./handlers/get');
var moment = require('moment');
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
    msg = msg.toString();//Buffer toString
    var time = moment().format('YYYYMMDD,hh:mm:ss');
    jsonio.append('./msg/msg.json',{
        msg: msg,
        time: time,
        from: rinfo.address
    });
    //console.log(rinfo);
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
        method: 'GET',
        path: '/api/msg',
        handler: api_get
    });
    webServer.route({
        method: 'POST',
        path: '/api/msg',
        handler: api_post
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