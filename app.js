global.config = require('minimist')(process.argv.slice(2));
new (require('./app/server'))();

process.on('uncaughtException', function (err)
{
    console.log('<- UNCAUGHT ERROR START ------------------------------------------------------------------------------>');
    console.log(new Date());
    console.log(err.message);
    console.log(err.stack);
    console.log('<- UNCAUGHT ERROR END -------------------------------------------------------------------------------->');
});


