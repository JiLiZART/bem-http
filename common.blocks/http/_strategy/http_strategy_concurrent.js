/**
 * @module http_strategy_concurrent
 */
modules.define(
    'http',
    ['i-bem__dom', 'jquery'],
    function (provide, Http) {

        /**
         * @exports
         * @class http_strategy_concurrent
         * @bem
         *
         */
        provide(Http.decl({
            block: this.name,
            modName: 'strategy',
            modVal: 'concurrent'
        }, /** @lends http_strategy_concurrent.prototype */{
            /**
             * @param jqXHRCallback
             * @returns {*}
             */
            execute: function (jqXHRCallback) {
                var jqXHR = jqXHRCallback();

                this._requests = this._requests || [];

                this._requests.push(jqXHR);
                this._current = jqXHR;

                return this._current;
            },

            abort: function () {
                this._requests.forEach(function (rq) {
                    rq.abort();
                });

                return this.__base.apply(this, arguments);
            }

        }, {}));

    });
