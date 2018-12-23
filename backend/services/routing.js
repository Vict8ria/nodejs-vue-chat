const messagesApi = require('../api/MessagesApi');
const Message = require('../models/Message');

module.exports = function routing(req, res, params){

    let url = req.url;
    let controller = "";

    // /messages
    // /messages/2345
    // /messages?fe=53
    let reg = /^\/messages([\/?]+.*)*$/;

    if(url.search(reg) != -1){
        controller = "messages";
    }

    switch (controller) {
        case "messages":
            let content = {};

            if(req.method == 'GET'){

                let id = typeof params.id != 'undefined' ? params.id : 0;

                content.messages = messagesApi.getMessages(id);

            } else {

                params = JSON.parse(params);
                let time = Math.floor(new Date() / 1000);

                let message = new Message(params.text, time, params.author);

                messagesApi.addMessage(message)
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(content));
            break;

        default:
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Егор');
    }

};