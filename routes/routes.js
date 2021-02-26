var routes_data = {
  routes: [
    {"Name": "Bayshore Bikeway",
    "Distance": "17.1 miles",
    "Surface" : "Asphalt, Concrete"
    },
    {"Name": "Coastal Rail Trail",
    "Distance": "4.7 miles",
    "Surface" : "Asphalt, Concrete"
    },
    {"Name": "Mission Beach-Pacific Beach Boardwalk",
    "Distance": "3 miles",
    "Surface" : "Concrete"
    },
    {"Name": "Sorrento Valley Road Trail",
    "Distance": "1 miles",
    "Surface" : "Asphalt"
    },
    {"Name": "Rose Canyon Bicycle Path",
    "Distance": "2.1 miles",
    "Surface" : "Asphalt"
    },
  ]
};
/*
 * GET nearby routes page.
 */

exports.view = function(req, res){
    res.render('routes', routes_data);
}
