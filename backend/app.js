const WebSocketServer = require('./servers/WebSocketServer');
const HTTPServer = require('./servers/HTTPServer');

let wsServer = new WebSocketServer(91);
wsServer.init();

let httpServer = new HTTPServer('127.0.0.1', 90);
httpServer.init();