/**
 * GET Run Screen
 */

const jsonData = require('../public/js/data.json');
const fs = require('fs');

exports.view = function(req, res) {
    res.render('settings', { settings: jsonData.settings });
}

exports.saveSettings = function(req, res) {
    var hypeSong = req.body.hypeSong;
    var distanceUsed = req.body.distanceUsed;
    var paceUsed = req.body.paceUsed;
    var timeUsed = req.body.timeUsed;
    var kilometersUsed = req.body.kilometersUsed;
    var milesUsed = req.body.milesUsed;

    var settingsRef = jsonData.settings;
    settingsRef.possibleHype.forEach(element => {
        if (element.name !== hypeSong) {
            element.selected = false;
        } else {
            element.selected = true;
        }
    });

    settingsRef.audio_feedback.distance.enabled = distanceUsed;
    settingsRef.audio_feedback.pace.enabled = paceUsed;
    settingsRef.audio_feedback.time.enabled = timeUsed;

    settingsRef.metric.Miles = milesUsed;
    settingsRef.metric.Kilometers = kilometersUsed;

    res.send('it worked');

    jsonData.settings = settingsRef;

    fs.writeFileSync('public/js/data.json', JSON.stringify(jsonData, null, 4));
}