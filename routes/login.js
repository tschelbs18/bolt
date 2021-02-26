/**
 * GET Login Screen
 */


const data = require('../public/js/data.json');

exports.view = function(req, res) {
    res.render('login', {alternativeLogins: data.altLoginOptions});
}