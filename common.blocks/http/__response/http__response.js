/**
 * @module http
 */
modules.define(
    'http__response', ['objects'],
    function (provide, objects) {

        function Response(settings, data) {
            this.settings = settings;
            this.data = data;
        }

        Response.prototype = objects.extend(Response.prototype, {
            setData: function (data) {
                this.data = data;
                return this;
            },

            getXHR: function () {
                return this.data.jqXHR;
            },

            getJSON: function () {
                return this.getXHR().responseJSON;
            },

            getText: function () {
                return this.getXHR().responseText;
            },

            getStatus: function () {
                return this.getXHR().status;
            },

            getStatusText: function () {
                return this.getXHR().statusText;
            },

            getError: function () {
                return this.data.errorThrown;
            }
        });

        /**
         * @exports
         * @class Response
         * @bem
         *
         */
        provide(Response);

    });
