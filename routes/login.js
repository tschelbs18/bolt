/**
 * GET Login Screen
 */

const renderData = require('../public/data/renderData.json');
const accountDb = require('../public/data/accounts.json');

const settingsDb = require('../public/data/settings.json');
const runsDb     = require('../public/data/pastRuns.json');
const routesDb   = require('../public/data/routes.json');

const defaultSettings = {
    possibleHype: [
        {
            name: "Kaaze - Electro Boy",
            selected: true
        },
        {
            name: "Skylike - Dawn",
            selected: false
        },
        {
            name: "Alex Skrindo - Me & You",
            selected: false
        },
        {
            name: "Jordan Schor - Home",
            selected: false
        },
        {
            name: "Martin Garrix - Proxy",
            selected: false
        }
    ],
    possiblePlaylist: [
        {
            name: "Default",
            selected: true
        }
    ],
    audio_feedback: {
        distance: {
            selected: true,
            description: "I want Bolt to tell me my total distance every kilometer/mile"
        },
        pace: {
            selected: false,
            description: "I want Bolt to tell me my pace at every kilometer/mile"
        },
        time: {
            selected: false,
            description: "I want Bolt to tell me every 10 minutes how long I've been running"
        }
    },
    metric: {
        Miles: true,
        Kilometers: false
    }
}

const defaultRuns = [], defaultRoutes = [];

exports.view = function(req, res) {
    res.render('login', {alternativeLogins: renderData.altLoginOptions});
}

exports.login = function(req, res) {
    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    if (!accountDb.hasOwnProperty(reqUsername)) {
        return res.status(401).send({error : 'Invalid username'});
    } else if (accountDb[reqUsername].password !== reqPassword) {
        return res.status(401).send({error : 'Password is incorrect'});
    } else {
        req.session.username = reqUsername;
        return res.status(200).send({message: 'Signed in successfully'});
    }
}

exports.signUp = function(req, res) {
    var reqUsername = req.body.username;
    var reqEmail = req.body.email;
    var reqPassword = req.body.password;
    if (accountDb.hasOwnProperty(reqUsername)) {
        return res.status(401).send({error: 'Account already exists'});
    }
    accountDb[reqUsername] = {password: reqPassword, email: reqEmail};
    settingsDb[reqUsername] = defaultSettings;
    runsDb[reqUsername] = defaultRuns;
    routesDb[reqUsername] = defaultRoutes;

    return res.status(201).send({message: 'Account created'});
}