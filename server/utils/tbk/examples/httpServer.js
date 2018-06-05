var http = require('http')
var spiUtil = require('../lib/spiUtil');

http.createServer(function (request, response) {
	var body = [];
	console.log(request.headers) ;
	request.on('data', function (chunk) {
		body.push(chunk);
	}) ;
	request.on('end', function () {
		response.write(""+spiUtil.checkSignForSpi(request.url,body,request.headers,'0ebbcccfee18d7ad1aebc5b135ffa906'));
		response.end();
	});
}).listen(8888) ;