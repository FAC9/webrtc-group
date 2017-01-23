var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('src/keys/key.pem'),
  cert: fs.readFileSync('src/keys/cert.pem')
};

var handler = function(request, response){
  var url = request.url;
  if (url === '/'){
    handlerForLandingPage(request, response);
    return 'handlerForLandingPage has been called';
  } else {
    handlerForAllPages(request, response);
    return 'handlerForAllPages has been called';
  }
};

function handlerForLandingPage (request, response) {
  fs.readFile(__dirname + '/../public/index.html', function(error, data){
    if (error){
      throw error;
    }
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(data);
  });
}

function handlerForAllPages(request, response) {
  var url = request.url;
  console.log(url);
  var fileType = url.split('.')[1];
  fs.readFile(__dirname + '/../public' + url, function(error, data){
    console.log(__dirname + '/../public' + url, 'dirname');
    if (error){
      throw error;
    }
    response.writeHead(200, {'content-type': 'text/'+ fileType});
    response.end(data);
  });
}

https.createServer(options, handler).listen(8000);
