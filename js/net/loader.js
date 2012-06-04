/* @nodeploy */
/**
 * User: okazaki
 * Date: 12/05/02
  */
(function(h){
    h.loader = {

        COMMADN_TYPE_IMAGE: 0,
        COMMAND_TYPE_JSON: 1,

        init: function () {
        },

        /**
         * @param name
         * @param url
         * @param params
         * @param callback
         * @private
         */
        getLoaderCommandBase_: function (name, url, params, callback) {
            var loaderCommandBase = {
              name: name,
              url: url,
              params: params,
              callback: callback,
              isNotLoaded: true
            };
            return loaderCommandBase;
        },

        /**
         * @param name
         * @param url
         * @param params
         * @param callback
         * @return {*}
         */
        getImageLoaderCommand: function (name, url, params, callback) {
            var imgLoader = this.getLoaderCommandBase_(name, url, params, callback);
            imgLoader.type = this.COMMADN_TYPE_IMAGE;
            return imgLoader;
        },

        /**
         * @param name
         * @param url
         * @param params
         * @param callback
         * @return {*}
         */
        getJsonLoaderCommand: function (name, url, params, callback) {
            var jsonLoader = this.getLoaderCommandBase_(name, url, params, callback);
            jsonLoader.type = this.COMMAND_TYPE_JSON;
            return jsonLoader;
        },

        /**
         * @param queues
         * @return {Object}
         */
        executCommandQueues: function (queues, context, callback) {

            var command = '',
                i, m=queues.length;

            for(i=0; i<m; i++){
                command = queues[i];
                if(command.isNotLoaded){
                    this.executeCommandQueue(command, queues, context, callback);
                    break;
                }
                //全部できた
                if(i == (m-1)){
                    if(typeof callback !== 'undefined'){
                        callback.call(context);
                    }
                }
            }
        },
        executeCommandQueue: function (command, queues, context, callback) {

            var self;
            switch(command.type){
                case this.COMMADN_TYPE_IMAGE :
                    var img = document.createElement('img');
                    self = this;
                    img.addEventListener('load', function () {
                        command.isNotLoaded = false;
                        command.callback(img, command);
                        self.executCommandQueues(queues, context, callback);
                    }, false);
                    img.setAttribute('src', command.url);

                    break;
                case this.COMMAND_TYPE_JSON :
                    self = this;
                    $.ajax({
                        url: command.url,
                        data: command.params,
                        dataType: 'jsonp',
                        jsonp : 'func',
                        success: function(json, status){
                            command.isNotLoaded = false;
                            self.executCommandQueues(queues);
                            command.callback(json, command);
                        },
                        error: function(){
                            alert('error');
                        }
                    });
                    break;
            }
        }


    };
})(halex);