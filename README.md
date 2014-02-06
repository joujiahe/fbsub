Facebook Realtime Update API for NodeJS

## Initialization
```js
var fbsub = require('fbsub');

fbsub.init({
    appId: <APP_ID>,
    appSecret: <APP_SECRET>,
    verifyToken: <VERIFY_TOKEN>,
    callbackUrl: <CALLBACK_URL>,
});
```

## Authentication and Subscription for Realtime Update
```js
fbsub.authenticate(function(err) {
    if (err == null) {
        fbsub.subscribe(object, fields, function(err) {
            if (err == null) {
                // ...
                console.log('fbsub subscribe succeed!');
            } else {
                // ...
                console.log('fbsub subscribe failed...');
            }
        });
    } else {
        // ...
        console.log('fbsub auth failed...');
    }
});

// Verification for Facebook Request
app.get(<CALLBACK_PATH>, fbsub.verify);

// Handle Facebook Push for Realtime Update
app.post(<CALLBACK_PATH>, function(req, res) {
    // ...
});
```

## Check Subscription List
```html
https://graph.facebook.com/<APP_ID>/subscriptions?access_token=<ACCESS_TOKEN>
```