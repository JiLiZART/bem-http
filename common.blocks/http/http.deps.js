({
    mustDeps: [
        {elem: 'response'},
        'identify',
        'objects',
        'i-bem'
    ],
    shouldDeps: [
        {mods: {strategy: ['abortable', 'concurrent', 'once']}}
    ]
})
