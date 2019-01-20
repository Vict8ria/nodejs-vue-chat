

window.onload = function() {

    let app = new Vue({
        el: '#chat',
        data: {
            message: "",
            author: "Vika",
            chatMessages: [],
            status: 'online',
            provider: null,
            providerFabric: null
        },
        created: function(){
            let _this = this;

            this.changeProvider();
        },
        methods: {

            changeProvider(providerName){
                if(typeof providerName === 'undefined') providerName = 'http';

                let providerFabric = this.getProviderFabric();
                this.provider = providerFabric.getProvider(providerName);
                this.provider.getMessages();
            },

            // lazy initialization
            getProviderFabric(){
                if(this.providerFabric === null){
                    this.providerFabric = new ProviderFabric();

                    this.providerFabric.constructor((resp)=>{
                        Vue.set(this, 'chatMessages', resp.messages)
                    });
                }

                return this.providerFabric;
            },

            addMessage(){
                let message = {text: this.message, author: this.author};

                this.provider.addMessage(message);
                this.message = "";

            }
        }
    });

};


/*
 * todo Вынести в отдельный провайдер вебсокеты
 * Сделать 2 метода, получить сообшения и добавить сообщение
 * Сделать прослушку события, на получение новых сообщений
 */

// send callback in to fabric
// create provider constructor, send callback to this provider
// create destructor in providers(2), and call this method when you change provider with fabric
// init last provider
