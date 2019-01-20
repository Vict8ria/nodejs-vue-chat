const WebSockets = require('ws');
const messagesApi = require('../api/MessagesApi');
const Message = require('../models/Message');

module.exports = class WebSocketServer {

    constructor(port){
        this.port = port;
    }

    init(){

        this.conn = new WebSockets.Server({
            port: this.port
        });

        this.conn.on('connection', ws => {
            ws.on('message', req => {
                //todo парсим и проверяем json, конвертим в обьект
                req = JSON.parse(req);

                //todo смотрим какое событие пришло
                /* todo взаимодействует с MessagesApi в зависимости от события
                *  Если сообещние добвить, добавляем и рассылаем его всем клиентам
                *  Если хотят получить все сообщения, отправляем этому клиенту и только ему
                *  Подсказка, нужно хранить список клиентов и как то понять кто текущий
                *  (понимать кто текущий для начала не обязательно)
                */

                let action = req.action;

                switch (action) {
                    case 'addMessage':

                        let time = Math.floor(new Date() / 1000);

                        let message = new Message(req.message.text, time, req.message.author);

                        messagesApi.addMessage(message);

                        this.sendMessages();

                        break;

                    case 'getMessages':

                        this.sendMessages();

                        break;
                }

            });
        });


    }

    sendMessages(){
        let content = {};
        content.messages = messagesApi.getMessages();

        this.conn.clients.forEach(client => {

            if(client.readyState === WebSockets.OPEN){
                client.send(JSON.stringify(content));
            }
        });
    }
};

