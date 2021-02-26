/*
 * GET nearby routes page.
 */

const jsonData = require('../public/js/data.json');

exports.view = function(req, res){
    res.render('routes', { routes: jsonData.routes });
}
