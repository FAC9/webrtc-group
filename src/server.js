var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./src/keys/key.pem'),
  cert: fs.readFileSync('./src/keys/cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);
