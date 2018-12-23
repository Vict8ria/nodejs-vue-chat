window.onload = function() {

    var app =new Vue({
        el: '#chat',
        data: {
            message: "",
            author: "Vika",
            chatMessages: []
        },
        methods: {
            addAuthor(author){
               this.newAuthor = author;
            },
            addMessage(){

                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "http://127.0.0.1:90/messages", true);
                body = JSON.stringify({text: this.message, author: this.author});
                xhttp.send(body);

                this.message = "";

            },
            getMessages(){

                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "http://127.0.0.1:90/messages", true);
                xhttp.send();

                xhttp.onreadystatechange = function() { // (3)
                    if (xhttp.readyState != 4) return;

                    if (xhttp.status != 200) {
                        console.log(xhttp.status, xhttp.statusText);
                    } else {

                        var resp = JSON.parse(xhttp.responseText);

                        Vue.set(app, 'chatMessages', resp.messages)
                    }

                };

            }
        },
        created(){
            var _this = this;
            setInterval(function (){
                _this.getMessages()
            }, 500);
        }
    });

};