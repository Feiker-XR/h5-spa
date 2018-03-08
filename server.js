var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    var url = req.url;
    //console.log(url);
    if(url !== 'favicon.ico'){
        if (url === '/') {
            readFile('index.html',res);
        }else{
            readFile('.'+url,res);
        }
    }

}).listen(3000)
function readFile(filename,res) {
    fs.readFile(filename, function (err, data) {
        if(err){
            return;
        }else{
            switch (filename.slice(filename.lastIndexOf('.')+1)){
                case 'html':
                    res.setHeader('Content-Type','text/html');
                    break;
                case 'js':
                    res.setHeader('Content-Type','text/javascript');
                    break;
                case 'css':
                    res.setHeader('Content-Type','text/css');
                    break;
	case 'jpg':
		res.setHeader('Content-Type','images/jpg');
		break;
	case 'png':
		res.setHeader('Content-Type','images/png');
		break;
	case 'mp3':
		res.setHeader('Content-Type','audio/mp3');
		break;
            }
            res.setHeader('Content-Length',data.length);
            res.end(data);
        }
    })
}
