var run_history = {
  runs: [
    {"Date": "2/26/2021",
    "Time": "33:29"
    "Distance": "3.81 miles",
    "Pace" : "8:47 per mile"
    },
    {"Date": "2/20/2021",
    "Time": "45:12"
    "Distance": "9.43 miles",
    "Pace" : "4:48 per mile"
    },
    {"Date": "2/15/2021",
    "Time": "27:45"
    "Distance": "3.90 miles",
    "Pace" : "7:07 per mile"
    },
    {"Date": "2/13/2021",
    "Time": "1:00:00"
    "Distance": "6 miles",
    "Pace" : "10:00 per mile"
    },
    {"Date": "2/12/2021",
    "Time": "19:00"
    "Distance": "2.00 miles",
    "Pace" : "9:30 per mile"
    },
  ]
};
/*
 * GET past runs page.
 */

exports.view = function(req, res){
    res.render('routes', run_history);
}
