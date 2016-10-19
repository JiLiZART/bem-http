/**
 * @module http_strategy_once
 */
modules.define(
    'http',
    [],
    function (provide, Http) {

        /**
         * @exports
         * @class http_strategy_once
         * @bem
         *
         */
        provide(Http.decl({
            block : this.name,
            modName : 'strategy',
            modVal : 'once'
        }, /** @lends http_strategy_once.prototype */{
            /**
             * @param jqXHRCallback
             * @returns {*}
             */
            execute : function (jqXHRCallback) {
                if(typeof this._current === 'undefined') {
                    this._current = jqXHRCallback();
                }

                return this._current;
            },

            abort : function () {
                if(this._current && this._current.abort) {
                    this._current.abort();
                }

                return this.__base.apply(this, arguments);
            }

        }, {}));

    });
