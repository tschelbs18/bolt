/**
 * GET Run Screen
 */

const jsonData = require('../public/js/data.json');

exports.view = function(req, res) {
    res.render('settings', { settings: jsonData.settings });
}