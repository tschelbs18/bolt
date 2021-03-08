/*
 * GET nearby routes page.
 */

const db = require('../public/data/routes.json');

exports.view = function(req, res){
    if (req.session.username === undefined) {
        res.redirect('/');
    }

    res.render('routes', { routes: db["San Diego"] });
}
