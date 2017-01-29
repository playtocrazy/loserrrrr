/**
 * LINE bot controllers
 */
var LINEBot = require('line-messaging');
var AWS = require('aws-sdk');

exports.createWebhook = function(app, server){
    var bot = LINEBot.create({
        channelID: '1498715301',
        channelSecret: 'd54920ce7dae98a511345961e24d546f',
        channelToken: 'CnGhAmpI1I6GuSvSY9jeLQ0oacUm+OWz3VYeSRQ3Uc5mqbPtkYVSEyuJkJXF83gJG+ad+aWHl0/TGuKsplhTaea6y+YaSzWL0rdZ1KB9kCQ7Hyw0vvTYREyUlL/pIfWJe9muqwsddAMzhBaCj/B+lAdB04t89/1O/w1cDnyilFU='
    }, server);
    app.use(bot.webhook('/webhook'));

    bot.on(LINEBot.Events.MESSAGE, function (replyToken, message) {
        // add code below.
    });
}