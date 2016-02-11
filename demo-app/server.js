var express = require('express');
var bodyParser = require('body-parser');

var server = express();

server.use(express.static(__dirname));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

var pictures = [{
	name: 'Autumn Gray',
	price: 100,
	url: 'http://www.fillmurray.com/300/200'
}, {
	name: 'Jagged',
	price: 500,
	url: 'http://www.fillmurray.com/150/500'
}, {
	name: 'Appetite',
	price: 30,
	url: 'http://www.fillmurray.com/400/400'
}];

server.get('/pictures', function (req, res, next) {
	res.json(pictures);
});

var sharedCart = [];

server.get('/cart', function (req, res, next) {
	res.json(sharedCart);
});

server.post('/cart', function (req, res, next) {
	sharedCart.push(req.body);
	res.status(201).end();
});

var port = 3000;
server.listen(port, function () {
	console.log('If you wanna be served, check out port', port);
});