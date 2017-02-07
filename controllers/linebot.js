/**
 * LINE bot controllers
 */
var LINEBot = require('line-messaging');
var request = require('request');

exports.createWebhook = function(app, server){
    var bot = LINEBot.create({
        channelID: '1498715301',
        channelSecret: 'd54920ce7dae98a511345961e24d546f',
        channelToken: '/SXbu0ym5ciFMOst7N5/Lw1vHUUbcpNFHjMH3wHHl9Pv7hTANjzyKO+q7H4A6UuAG+ad+aWHl0/TGuKsplhTaea6y+YaSzWL0rdZ1KB9kCTS2S43oUjc+yhS+1I3gz2WBe5cIbFw/tL4zXdLp9RcUQdB04t89/1O/w1cDnyilFU='
    }, server);
    app.use(bot.webhook('/webhook'));
    console.log("bind webhook success!");

    bot.on(LINEBot.Events.MESSAGE, function (replyToken, message) {
        if(message.getMessageType() === "text" && message.getText() === "B"){
            request('https://za8601p1g2.execute-api.us-west-2.amazonaws.com/prod/getcurrentdata', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var items = JSON.parse(body).Items;
                    var columns = [];
                    items.forEach(function(item){
                        var column = new LINEBot.CarouselColumnTemplateBuilder();
                        column.setTitle(item.title)
                        .setMessage(item.text)
                        .setThumbnail(item.thumbnailImageUrl)
                        .addAction('看文章', item.articleUrl, LINEBot.Action.URI);
                        columns.push(column)
                    })                
                    var carousel = new LINEBot.CarouselTemplateBuilder(columns);
                    var template = new LINEBot.TemplateMessageBuilder('this is a template', carousel);
                    bot.replyMessage(replyToken, template);
                }
            })
        }else{
            var textMessageBuilder = new LINEBot.TextMessageBuilder("請輸入\"B\"以取得資料!");
            bot.replyMessage(replyToken, textMessageBuilder);
        }        
    });
}