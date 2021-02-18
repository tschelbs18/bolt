
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
    menu: [
      {'id': '1',
       'path': 'settings',
       'image': 'lorempixel.people.1.jpeg',
       'name': 'My Settings'},
      {'id': '2',
       'path': 'start_run',
       'image': 'lorempixel.people.2.jpeg',
       'name': 'Start Run'},
      {'id': '3',
       'path': 'routes',
       'image': 'lorempixel.people.3.jpeg',
       'name': 'Routes'},
      {'id': '4',
       'path': 'past_runs',
       'image': 'lorempixel.people.4.jpeg',
       'name': 'Past Runs'},
    ]
  });
}