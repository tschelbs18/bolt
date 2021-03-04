/*
 * GET nearby routes page.
 */

const db = require('../public/data/routes.json');

exports.view = function(req, res){
    res.render('routes', { routes: db[req.session.username] });
}
