const http = require('http');
const url = require('url');

const routing = require('./services/routing');

const hostname = '127.0.0.1';
const port = '90';

const server = http.createServer((req, res) => {

    if(req.method == 'POST'){
        let params = [];
        req.on('data', (chunk) => {
            params.push(chunk);
        }).on('end', () => {
            params = Buffer.concat(params).toString();

            routing(req, res, params);
        });
    }else if (req.method == 'GET'){

        let urlParts = url.parse(req.url, true);
        let params = urlParts.query;

        routing(req, res, params)
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});