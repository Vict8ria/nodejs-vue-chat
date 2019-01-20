let ProviderFabric = function () {

    this.lastProvider = null;
    this.callback = null;

    this.constructor = function (callback) {
        this.callback = callback;
    };

    this.getProvider = function(name){
        if(this.lastProvider !== null){
          this.lastProvider.destructor();
        }

        switch(name){
            case 'webSocket':
                var provider = new WebSocketProvider();
                break;

            case 'http':
                var provider = new HttpProvider();
                break;

            default:
                throw new Error('Provider name is not valid or exist');
        }

        provider.constructor(this.callback);

        this.lastProvider = provider;

        return provider;
    };

};
