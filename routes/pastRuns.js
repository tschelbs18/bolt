const jsonData = require('../public/js/data.json');
/*
 * GET past runs page.
 */

exports.view = function(req, res){
    res.render('pastRuns', { runs: jsonData.pastRuns });
}
