/**
 * GET Run Screen
 */

const db = require('../public/data/settings.json');

exports.view = function(req, res) {
    res.render('settings', { settings: db[req.session.username] });
}

exports.saveSettings = function(req, res) {
    var hypeSong = req.body.hypeSong;
    var distanceUsed = req.body.distanceUsed;
    var paceUsed = req.body.paceUsed;
    var timeUsed = req.body.timeUsed;
    var kilometersUsed = req.body.kilometersUsed;
    var milesUsed = req.body.milesUsed;

    const settingsRef = db[req.session.username];
    settingsRef.possibleHype.forEach(element => {
        if (element.name !== hypeSong) {
            element.selected = false;
        } else {
            element.selected = true;
        }
    });

    settingsRef.audio_feedback.distance.selected = (distanceUsed === 'true');
    settingsRef.audio_feedback.pace.selected = (paceUsed === 'true');
    settingsRef.audio_feedback.time.selected = (timeUsed === 'true');

    settingsRef.metric.Miles = (milesUsed === 'true');
    dsettingsRef.metric.Kilometers = (kilometersUsed === 'true');

    res.send({message: 'It worked'});
}