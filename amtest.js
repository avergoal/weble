var amqp = require('amqplib/callback_api');
amqp.connect('amqp://admin:31709d287a1c612a8df434cf1539ccd6b38d1cf3@185.45.144.84:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        // var queue = 'MainPost';
        var queue = 'HotListPost';
        var msg = {ids:[35]};

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log(" [x] Sent %s", msg);
    });
});
