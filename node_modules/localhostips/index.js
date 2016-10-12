var os = require('os');
module.exports=function(){
    var ip_arr=[];
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        var items = ifaces[dev];
        for (var item in items) {
            if (items[item].netmask === '255.255.255.0') {
                var ip=items[item].address;
                ip_arr.push(ip);
            }
        }
    }
    return ip_arr;
}