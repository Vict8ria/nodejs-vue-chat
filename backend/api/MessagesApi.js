class MessagesApi {

    constructor(){
        this.messages = []
    }

    getMessages(id){
        return this.messages
    }

    addMessage(message){
        message.id = this.messages.length;
        this.messages.push(message);
    }

}

let messageApi = new MessagesApi();

module.exports = messageApi;