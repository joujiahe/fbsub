Facebook Realtime Update API for NodeJS

## Usage
#### Initialization
```js
var fbsub = require('fbsub');

fbsub.init({
    appId: <APP_ID>,
    appSecret: <APP_SECRET>,
    verifyToken: <VERIFY_TOKEN>,
    callbackUrl: <CALLBACK_URL>,
});
```

#### Authentication and Subscription for Realtime Update
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

#### Unsubscribe

Unsubscribes from all endpoints.

```js
fbsub.unSubscribe(callback);
```

#### Provide API for Facebook Verification Callback and Realtime Push
```js
// Sample code is based on express@3.4.8
// 
// Verification for Facebook Request
app.get(<CALLBACK_PATH>, fbsub.verify);

// Handle Facebook Push for Realtime Update
app.post(<CALLBACK_PATH>, function(req, res) {
    // ...
});
```

#### Get a list of all current subscriptions
```js
fbsub.getSubscriptions(console.log);
```

#### Get the access token once authorized
```js
var accessToken = fbsub.getAccessToken();
```

## How to manually check Subscription List
```html
https://graph.facebook.com/<APP_ID>/subscriptions?access_token=<ACCESS_TOKEN>
```
