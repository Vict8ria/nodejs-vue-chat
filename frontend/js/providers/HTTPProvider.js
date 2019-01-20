function HttpProvider() {
    let _this = this;

    this.uri = 'http://127.0.0.1:90';
    this.interval = null;
    this.getMessagesCallback = null;

    this.constructor = function(callback){
        this.getMessagesCallback = callback;

        this.interval = setInterval(function (){
            _this.getMessages();
        }, 1000);
    };

    this.destructor = function(){
        clearInterval(this.interval);
        console.log("http destructor");
    };

    this.addMessage = function(message){
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.uri + "/messages", true);
        body = JSON.stringify(message);
        xhttp.send(body);
    };

    this.getMessages = function(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.uri + "/messages", true);
        xhttp.send();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState !== 4) return;

            if (xhttp.status !== 200) {
                console.log(xhttp.status, xhttp.statusText);
            } else {

                var resp = JSON.parse(xhttp.responseText);

                _this.getMessagesCallback(resp);
            }

        };
    };

};