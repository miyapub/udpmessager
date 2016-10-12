const jsonio = require('jsonio');
module.exports = function (request, reply) {
    jsonio.read('./msg/msg.json', function (json) {
        //json = JSON.stringify(json, null, ' 　');
        
        return reply(json);
    });
}