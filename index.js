// Dependencies
var https = require('https')
  , querystring = require('querystring')
  , url = require('url');

// Defaults
var FACEBOOK_GRAPH_URL = 'graph.facebook.com'
  , FACEBOOK_OAUTH_PATH = '/oauth/access_token'
  , config = {};

// Configuration
function init(options) {
    config = {
        appId: options.appId,
        appSecret: options.appSecret,
        verifyToken: options.verifyToken,
        callbackUrl: options.callbackUrl
    };
}

// OAuth
function authenticate(callback) {
    https.get({
        host: FACEBOOK_GRAPH_URL,
        path: FACEBOOK_OAUTH_PATH + 
            '?client_id=' + config.appId + 
            '&client_secret=' + config.appSecret + 
            '&grant_type=client_credentials'
    }, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            if (data.toString().indexOf("error") === -1) {
                var accessToken = data.split("=")[1];
                config.accessToken = accessToken;

                callback(null);
            } else {
                callback(data);
            }
        }).on('error', function(e) {
            callback(e.message);
        });
    });
}

// Subscribe specified object and fields
function subscribe(object, fields, callback) {
    var req = https.request({
        host: FACEBOOK_GRAPH_URL,
        port: 443,
        path: '/' + config.appId + '/subscriptions?access_token=' + config.accessToken,
        method: 'POST'
    }, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            if (data.indexOf("error") === -1){
                callback(null);
            } else {
                callback(data);
            }
        }).on('error', function(e) {
            callback(e.message);
        });
    });

    req.write(querystring.stringify({
        'callback_url': config.callbackUrl,
        'object': object,
        'fields': fields,
        'verify_token': config.verifyToken
    }));

    req.end();
}

// Verify handler for Facebook
function verify(req, res) {
    console.log('Get verification request...')
    var url_parts = url.parse(req.url,true);
    var query = url_parts.query;

    if (query.hasOwnProperty('hub.verify_token')) {
        if (query['hub.verify_token'] === config.verifyToken) {
            console.log('Verified!')
            res.send(query['hub.challenge']);
        }
    }
}

module.exports = {
    init: init,
    authenticate: authenticate,
    subscribe: subscribe,
    verify: verify
};