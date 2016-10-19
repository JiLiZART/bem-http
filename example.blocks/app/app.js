/**
 * @module app
 */
modules.define(
    'app',
    ['i-bem__dom', 'jquery', 'http'],
    function (provide, BEMDOM, $, Http) {

        /**
         * @exports
         * @class app
         * @augments BEM
         * @bem
         */
        var app = BEMDOM.decl(this.name, /** @lends app.prototype */{
            onSetMod : {
                'js' : {
                    /**
                     * @constructs
                     */
                    'inited' : function () {
                        this
                            .bindTo('once', 'click', this._onOnceClick)
                            .bindTo('concurrent', 'click', this._onConcurrentClick)
                            .bindTo('abortable', 'click', this._onAbrotableClick);
                    }
                }
            },

            _onOnceClick : function () {
                Http
                    .once(this)
                    .get(this.params.url)
                    .then(function (response) {
                        BEMDOM.replace(this.elem('once-content'), response.getText());
                    }.bind(this));
            },

            _onConcurrentClick : function () {
                Http
                    .concurrent(this)
                    .get(this.params.url)
                    .then(function (response) {
                        BEMDOM.replace(this.elem('concurrent-content'), response.getText());
                    }.bind(this));
            },

            _onAbrotableClick : function () {
                Http
                    .abortable(this)
                    .get(this.params.url)
                    .then(function (response) {
                        BEMDOM.replace(this.elem('abortable-content'), response.getText());
                    }.bind(this));
            }
        }, /** @lends app */{});

        provide(app);
    });
