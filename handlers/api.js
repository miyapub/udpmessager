const dgram = require('dgram');
function send(msg) {
    //const message = Buffer.from(msg);
    const message = new Buffer(msg);
    const client = dgram.createSocket('udp4');

    client.bind(function () {
        client.setBroadcast(true);
    });


    client.send(message, 2222, '255.255.255.255', (err) => {
        client.close();
    });
}

module.exports = function (request, reply) {
    var msg = request.payload.msg;//post    get  params
    send(msg);
    var json = {
        err: 0,
        msg: msg,
    };
    return reply(json);
}