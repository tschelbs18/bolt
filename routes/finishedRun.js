/*
 * GET finished run page.
 */

exports.view = function(req, res){
    var data = {
      "time" : req.session.time,
      "distance": req.session.distance,
      "pace": req.session.pace
    };
    res.render('finishedRun', data);
}

exports.finishRun = function (req, res) {
  req.session.time = req.body.time;
  req.session.distance = req.body.distance;
  req.session.pace = req.body.pace;
  res.send('finished run');
}
