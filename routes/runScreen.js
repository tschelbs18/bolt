
/*
 * GET run screen.
 */

const jsonData = require('../public/js/data.json');

exports.view = function(req, res){
    res.render('runScreen', { actions : jsonData.runningActions });
}