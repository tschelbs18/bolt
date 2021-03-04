/*
 * GET finished run page.
 */

exports.view = function(req, res){
    var data = {
      "time" : req.params.time,
      "distance": req.params.distance,
      "pace": req.params.pace
    };
    res.render('finishedRun', data);
}
