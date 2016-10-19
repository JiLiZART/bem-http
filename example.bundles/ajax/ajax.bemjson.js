/*global module*/
module.exports = {
    block : 'menu',
    mods : { theme : 'islands', size : 'm', mode : 'radio-check' },
    val : 2,
    content : [
        {
            block : 'menu-item',
            val : 1,
            content : 'Отдых в горах ' + Date.now()
        },
        {
            block : 'menu-item',
            val : 2,
            content : 'Отдых на море' + Date.now()
        }
    ]
};
