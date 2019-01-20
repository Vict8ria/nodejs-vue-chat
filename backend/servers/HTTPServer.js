const http = require('http');
const url = require('url');

const routing = require('../services/routing');

module.exports = class HTTPServer {

    constructor(hostname, port){
        this.hostname = hostname;
        this.port = port;
    }

    init(){

        let server = http.createServer((req, res) => {

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

        server.listen(this.port, this.hostname, () => {
            console.log(`Server running at http://${this.hostname}:${this.port}/`);
        });

    }
};