/*global module*/
module.exports = {
    block : 'page',
    title : 'http',
    styles : [{ elem : 'css', url : 'index.min.css' }],
    scripts : [{ elem : 'js', url : 'index.min.js' }],
    content : [
        {
            block : 'app',
            js : {
                url : '/example.bundles/ajax/ajax.html'
            },
            content : [
                [
                    {
                        block : 'button',
                        mods : {
                            theme : 'islands',
                            size : 'm'
                        },
                        mix : { block : 'app', elem : 'once' },
                        text : 'Makes ajax only once'
                    },
                    {
                        elem : 'once-content',
                        content : 'Ajax content goes here'
                    }
                ],
                [
                    {
                        block : 'button',
                        mods : {
                            theme : 'islands',
                            size : 'm'
                        },
                        mix : { block : 'app', elem : 'concurrent' },
                        text : 'Makes ajax concurrent'
                    },
                    {
                        elem : 'concurrent-content',
                        content : 'Ajax content goes here'
                    }
                ],
                [
                    {
                        block : 'button',
                        mods : {
                            theme : 'islands',
                            size : 'm'
                        },
                        mix : { block : 'app', elem : 'abortable' },
                        text : 'Aborts previous request'
                    },
                    {
                        elem : 'abortable-content',
                        content : 'Ajax content goes here'
                    }
                ]
            ].map(function (group) {
                return {
                    elem : 'group',
                    content : group
                }
            })
        }
    ]
};
