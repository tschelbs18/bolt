
/*
 * GET run screen.
 */

exports.view = function(req, res){
    res.render('runScreen', {
        actions: [
        {'id': 'start-run',
            'image': 'lorempixel.people.1.jpeg',
            'name': 'Run'},
        {'id': 'increase-volume',
            'image': 'lorempixel.people.2.jpeg',
            'name': 'Louder'},
        {'id': 'decrease-volume',
            'image': 'lorempixel.people.3.jpeg',
            'name': 'Softer'},
        {'id': 'query-distance',
            'image': 'lorempixel.people.4.jpeg',
            'name': 'Distance'},
        {'id': 'query-pace',
            'image': 'lorempixel.people.1.jpeg',
            'name': 'Pace'},
        {'id': 'play-hype',
            'image': 'lorempixel.people.2.jpeg',
            'name': 'Hype'},
        {'id': 'skip-song',
            'image': 'lorempixel.people.3.jpeg',
            'name': 'Skip'},
        {'id': 'play-prev-song',
            'image': 'lorempixel.people.4.jpeg',
            'name': 'Back'},
        ]
    });
}