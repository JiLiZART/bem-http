/**
 * @module Http
 */
modules.define(
    'http',
    ['i-bem', 'identify', 'jquery', 'http__response'],
    function (provide, BEM, identify, $, Response) {

        /**
         * @exports
         * @class Http
         * @bem
         *
         */
        var Http = BEM.decl(this.name, /** @lends Http.prototype */{
            onSetMod : {
                'js' : {
                    'inited' : function () {
                        /*global console:true*/
                        !this.hasMod('strategy') && console.warn('Strategy modifier required for http', this);
                    }
                }
            },

            /**
             *
             * @param silent
             * @returns {http}
             */
            abort : function (silent) {
                if(!silent) {
                    this.emit('abort');
                }

                return this;
            },

            /**
             *
             * @param url
             * @param data
             * @returns {*}
             */
            get : function (url, data) {
                return this.ajax({
                    url : url,
                    data : data
                });
            },

            /**
             *
             * @param url
             * @param data
             */
            post : function (url, data) {
                return this.ajax({
                    url : url,
                    data : data,
                    method : 'POST'
                });
            },

            /**
             *
             * @param settings
             * @returns {*}
             */
            ajax : function (settings) {
                var response = new Response(settings);

                return this
                    .execute(this._strategyCallback(settings))
                    .then(function (data, textStatus, jqXHR) {
                        response.setData({
                            response : data,
                            jqXHR : jqXHR,
                            textStatus : textStatus
                        });

                        this.emit('done', response);
                        return this._resolve(response);
                    }.bind(this), function (jqXHR, textStatus, errorThrown) {
                        if(jqXHR.statusText === 'abort') {
                            return this._promise();
                        }

                        response.setData({
                            jqXHR : jqXHR,
                            textStatus : textStatus,
                            errorThrown : errorThrown
                        });

                        this.emit('fail', response);
                        return this._reject(response);
                    }.bind(this));
            },

            _strategyCallback : function (settings) {
                return function strategyCallback() {
                    return $.ajax(settings);
                };
            },

            _promise : function () {
                return $.Deferred().promise();
            },

            _resolve : function (data) {
                return $.Deferred().resolve(data);
            },

            _reject : function (data) {
                return $.Deferred().reject(data);
            }

        }, {

            /**
             * Decorated blocks
             */
            _decorated : {},

            /**
             * Request instances
             */
            _requests : {},

            abortable : function (block, name, params) {
                return this._factory(block, name, 'abortable', params);
            },

            concurrent : function (block, name, params) {
                return this._factory(block, name, 'concurrent', params);
            },

            once : function (block, name, params) {
                return this._factory(block, name, 'once', params);
            },

            _factory : function (block, name, strategy, params) {
                var id = this._blockId(block),
                    reqName = this._requestName(block, strategy, name),
                    instance = this.getRequest(id, reqName);

                if(!this._isDecorated(id)) {
                    this._decorate(block, id);
                }

                if(!instance) {
                    return this.addRequest(id, reqName, BEM.create({
                        block : this.getName(),
                        mods : { strategy : strategy }
                    }, params));
                }

                return instance;
            },

            _isDecorated : function (id) {
                return Boolean(this._decorated[id]);
            },

            _decorate : function (block, id) {
                var clearRequests = this.clearRequests.bind(this, id);

                block.on({ modName : 'js', modVal : '' }, clearRequests);

                this._decorated[id] = true;
            },

            _requestName : function (block, strategy, name) {
                return [block.params.uniqId, strategy, name].join('');
            },

            _blockId : function (block) {
                return identify(block);
            },

            getRequest : function (id, name) {
                return this._requests[id] && this._requests[id][name] || null;
            },

            addRequest : function (id, name, request) {
                this._requests[id] = this._requests[id] || {};

                if(!this._requests[id][name]) {
                    request.name = String(name);
                    return this._requests[id][name] = request;
                } else {
                    throw new Error('Request for ' + id + ' by name ' + name + ' already exist');
                }
            },

            clearRequests : function (id) {
                if(this._requests[id]) {
                    $.each(this._requests[id], function (_, rq) {
                        rq.abort();
                    });
                }

                delete this._requests[id];
            }
        });

        provide(Http);
    });
