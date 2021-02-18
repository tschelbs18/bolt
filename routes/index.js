
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
    menu: [
      {'id': 'settings',
       'path': 'settings',
       'image': 'https://res.cloudinary.com/glide/image/fetch/f_auto,w_225,h_338,c_lfill/https%3A%2F%2Fwww.flaticon.com%2Fsvg%2Fvstatic%2Fsvg%2F126%2F126472.svg%3Ftoken%3Dexp%3D1613004942~hmac%3De2c5b782334c4e6932f01cf4f10e2767',
       'name': 'My Settings'},
      {'id': 'start-run',
       'path': 'start_run',
       'image': 'https://img.icons8.com/ios/452/running.png',
       'name': 'Start Run'},
      {'id': 'routes',
       'path': 'routes',
       'image': 'https://img.icons8.com/pastel-glyph/2x/route.png',
       'name': 'Routes'},
      {'id': 'past-runs',
       'path': 'past_runs',
       'image': 'https://res.cloudinary.com/glide/image/fetch/f_auto,w_225,h_338,c_lfill/https%3A%2F%2Fwww.flaticon.com%2Fsvg%2Fvstatic%2Fsvg%2F32%2F32223.svg%3Ftoken%3Dexp%3D1613005293~hmac%3Dcdb4576cb5cbc12e17502ec6907d70e7',
       'name': 'Past Runs'},
    ]
  });
}