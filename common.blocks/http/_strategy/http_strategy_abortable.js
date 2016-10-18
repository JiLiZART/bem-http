/**
 * @module http_strategy_abortable
 */
modules.define(
    'http',
    function (provide, Http) {

        /**
         * @exports
         * @class http
         * @bem
         */
        provide(Http.decl({block : this.name, modName: 'strategy', modVal: 'abortable'}, /** @lends http.prototype */{
            /**
             * @param jqXHRCallback
             * @returns {*}
             */
            execute: function (jqXHRCallback) {
                var jqXHR = jqXHRCallback();

                this.abort();
                this._current = jqXHR;

                return this._current;
            },

            abort: function () {
                if (this._current && this._current.abort) {
                    this._current.abort();
                }

                return this.__base.apply(this, arguments);
            }

        }, {}));

    });
