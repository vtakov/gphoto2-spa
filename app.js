var express = require('express');
var app = express();
var childProcess = require('child_process').exec;
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

function exec(command, callback) {
    return childProcess(command, execute);
    
    function execute(error, stdout, stderr) {
        if (error || stderr) {
            console.error(error, stderr);
        }
        callback(stdout);
    }
}

app.get('*', sendIndex);

function sendIndex(req, res) {
    res.sendFile('./public/index.html');
}

app.get('/', function (req, res) {
    exec('gphoto2 --capture-image', oo);
    
    function oo(obj) {
        res.send(obj);
    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
