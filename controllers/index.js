var os = require('os');

exports.index = function(req, res, next){
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    res.render('index', { title: 'LoserrrrR', ip: addresses[0]});
}