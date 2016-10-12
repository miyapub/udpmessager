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
    var err = 1;
    if (msg) {
        send(msg);
        err = 0;
    }
    var json = {
        err: err,
        msg: msg,
    };
    return reply(json);
}