var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.getData = function (event, context, callback) {
    console.log(JSON.stringify(`Event: event`))
    var params = {
        RequestItems: {
            "ptt_data": {
                Keys: [
                    {
                        "id": {
                            N: "1"
                        }
                    }, {
                        "id": {
                            N: "2"
                        }
                    }
                ],
                ProjectionExpression: "AlbumTitle"
            }
        }
    };

    dynamodb.batchGetItem(params, function (err, data) {
        if (err) 
            console.log(err, err.stack); // an error occurred
        else 
            console.log(data); // successful response
        }
    );

    // Lambda Code Here context.succeed('Success!') context.fail('Failed!')
}