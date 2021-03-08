var data = {};
// We should probably make it so that a music JSON object gets passed with all the links and artwork to the music we are including in the prototype
/*
 * GET voice sandbox.
 */

exports.view = function(req, res){
    if (req.session.username === undefined) {
        res.redirect('/');
    }

    res.render('duringRun', {data});
}
