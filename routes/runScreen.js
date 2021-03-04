
/*
 * GET run screen.
 */

const renderData = require('../public/data/renderData.json');

exports.view = function(req, res){
    res.render('runScreen', { actions : renderData.runningActions });
}