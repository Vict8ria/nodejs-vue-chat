/**
 *
 * @constructor
 *
 * getMessagesCallback - обязаткльно присвоить фунуцию обрабатывающую массив полученных сообшений
 */

var WebSocketProvider = function(){
    this.url = "ws://127.0.0.1:91";

    this.ws = null;

    this.constructor = function(getMessageCallback){
        var ws = new WebSocket(this.url);

        ws.onerror = error => {
            console.log(`WebSocket error: ${error}`)
        };

        ws.onmessage = resp => {
            var messages = JSON.parse(resp.data);
            getMessageCallback(messages);
        };

        ws.onopen = () => {
            console.log('online')
        };

        ws.onclose = () => {
            console.log('disconnected');
        };

        this.ws = ws;
    };

    this.destructor = function(){
        console.log('ws destructor')
        this.ws.close();
    };

    this.addMessage = function(message){
        let req = {
            action: 'addMessage',
            message: message
        };

        this.ws.send(JSON.stringify(req));
    };

    this.getMessages = function(){
        if(this.ws.readyState !== this.ws.OPEN) return false;

        let req = {
            action: 'getMessages'
        };

        this.ws.send(JSON.stringify(req));

        return true;
    };

}