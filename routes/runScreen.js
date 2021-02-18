
/*
 * GET run screen.
 */

exports.view = function(req, res){
    res.render('runScreen', {
        actions: [
        {'id': 'start-run',
            'image': 'https://cdn.iconscout.com/icon/free/png-64/start-1438842-1214529.png',
            'name': 'Run'},
        {'id': 'increase-volume',
            'image': 'https://cdn2.iconfinder.com/data/icons/media-controls-7/24/icon-media-controls-decrease-volume-512.png',
            'name': 'Louder'},
        {'id': 'decrease-volume',
            'image': 'https://static.thenounproject.com/png/3408653-200.png',
            'name': 'Softer'},
        {'id': 'query-distance',
            'image': 'https://static.thenounproject.com/png/193079-200.png',
            'name': 'Distance'},
        {'id': 'query-pace',
            'image': 'https://static.thenounproject.com/png/2806638-200.png',
            'name': 'Pace'},
        {'id': 'play-hype',
            'image': 'https://cdn.iconscout.com/icon/free/png-128/hype-machine-739506.png',
            'name': 'Hype'},
        {'id': 'skip-song',
            'image': 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_skip_next_48px-512.png',
            'name': 'Skip'},
        {'id': 'play-prev-song',
            'image': 'https://cdn.iconscout.com/icon/free/png-128/back-1438835-1214522.png',
            'name': 'Back'},
        ]
    });
}