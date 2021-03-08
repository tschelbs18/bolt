const db = require('../public/data/pastRuns.json');
/*
 * GET past runs page.
 */

exports.view = function(req, res){
    if (req.session.username === undefined) {
        res.redirect('/');
    }

    res.render('pastRuns', { runs: db[req.session.username] });
}

exports.saveRun = function(req, res) {
    if (req.session.username === undefined) {
        res.status(400).send({error: 'User must login before accessing endpoints.'})
    }

    var reqUser = req.session.username;

    var run = {
        Date: req.body.date,
        Time: req.body.time,
        Distance: req.body.distance,
        Pace: req.body.pace
    };

    db[reqUser].push(run);

    res.send('It has finished');
}