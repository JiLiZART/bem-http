({
    mustDeps : [
        { elem : 'response' },
        'identify',
        'objects',
        'i-bem',
        'jquery'
    ],
    shouldDeps : [
        { mods : { strategy : ['abortable', 'concurrent', 'once'] } }
    ]
})
