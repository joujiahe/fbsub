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

## Usage
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
```

## Subscription List
```html
https://graph.facebook.com/<APP_ID>/subscriptions?access_token=<ACCESS_TOKEN>
```