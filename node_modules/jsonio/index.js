const fs = require('fs');
function json2str(json) {
    return JSON.stringify(json, null, ' ');
}
function str2json(str) {
    return JSON.parse(str);
}
module.exports = {
    read: function (file, cb) {
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            //console.log(data);
            data = data.toString();
            var json = str2json(data);
            if (typeof cb === 'function') {
                console.log('read_data:', json);
                cb(json);
            }
        });
    },
    write: function (file, json, cb) {
        fs.writeFile(file, json2str(json), (err) => {
            if (err) throw err;
            //console.log('It\'s saved!');
            if (typeof cb === 'function') {
                cb();
            }
        });
    },
    append: function (file, json, cb) {
        this.read(file, function (j) {
            console.log('j:', j);
            var writeJson = null
            if ({} instanceof Object) {
                var arr = [];
                arr.push(j);
                arr.push(json);
                writeJson = arr;
            }
            if (j instanceof Array) {
                j.push(json);
                writeJson = j;
            }
            console.log('writeJson:', writeJson);
            fs.writeFile(file, json2str(writeJson), (err) => {
                if (err) throw err;
                //console.log('The "data to append" was appended to file!');
                if (typeof cb === 'function') {
                    cb();
                }
            });
        });
    }
}