
/*
 * GET run screen.
 */

const renderData = require('../public/data/renderData.json');

exports.view = function(req, res){
    if (req.session.username === undefined) {
        res.redirect('/');
    }

    res.render('help', { actions : renderData.runningActions });
}
