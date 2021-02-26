var user_settings = {
  'testuser': {
    'hype_song': 'Kaaze - Electro Boy',
    'current_playlist': 'Default',
    'distance_audio': true,
    'pace_audio': true,
    'time_audio': false,
    'distance_metric': 'Miles',
  }
};
/*
 * GET user settings page.
 */

 // In production we'll grab the current user and compare to the global settings file, then show their settings

exports.view = function(req, res){
    res.render('settings', user_settings);
}
