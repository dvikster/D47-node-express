let http = require("http");
let fs = require('fs');

let counter=0;

http.createServer(function(request, response){
    let url = request.url;
    let date = new Date();
    date =  date.toString()
    let logInfo = `${request.url} - ${date}`;
    console.log(logInfo);
    fs.appendFile('log.txt', logInfo + "\n");

    let newUrl = url.replace(/\/$/g,'');
    switch(newUrl) {
        case '/index':
            fs.readFile("index.html", "utf8", function(error, data){
                counter++;
                // console.log(data);
                data = data.replace("{counter}", counter);
                response.end(data);
            });
            break;

        default:
            fs.readFile("404.html", "utf8", function(error, data){
                response.end(data);
            });
            break;
    }

}).listen(3000);


