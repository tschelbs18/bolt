
/*
 * GET home page.
 */

const renderData = require('../public/data/renderData.json');

exports.view = function(req, res){
  res.render('home', { menu: renderData.homeMenuItems } );
}