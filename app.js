let http = require("http");
let fs = require('fs');

let counter =0;
let counterPrice=0;
let counterPriceUnic=0;

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
            counterPrice=0;
            fs.readFile('index.html', "utf8", function(error, data){
                if(error){
                    response.statusCode = 404;
                    response.end("Ресурс не найден!");
                }
                else{
                    counter++;
                    // console.log(counter);
                    // console.log(data);
                    data = data.replace("{counter}", counter);
                    response.end(data);
                }
                return;
            });
            break;
        case '/price.zip':
            counterPrice++;

            if (counterPrice == 1){
                counterPriceUnic++;
                console.log(counterPrice);
                console.log(counterPriceUnic);
                let price = `файл скачен ${counterPriceUnic} раз`;
                fs.writeFile('1.txt', price);
            }
            break;
        default:
            loadPage('404');
            break;
    }


    function loadPage(filename){
        fs.readFile(filename+'.html', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end("Ресурс не найден!");
            }
            else{
                response.end(data);
            }
            return;
        });
    }

}).listen(3000);

