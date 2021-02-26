
/*
 * GET home page.
 */

const data = require('../public/js/data.json');

exports.view = function(req, res){
  res.render('home', { menu: data.homeMenuItems } );
}