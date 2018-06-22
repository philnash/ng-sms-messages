# Web, Twilio and Service Worker powered SMS Messages app

This is an implementation of an SMS Messages app that you can use with a [Twilio](https://twilio.com) number, with a front end built with Angular 6, enhanced with Service Worker features.

This was the demo application used at Angular Conf Melbourne, for the talk [Service Worker - Beyond the cache](https://speakerdeck.com/philnash/service-workers-beyond-the-cache-angular-conf-australia).

## Important code

### Push Notifications

Check out the `settings.component.ts` for registering and unregistering for Push Notifications with the `swPush` service.

For sending Push Notifications, take a look at `server/routes/index.js`.

### Background Sync

Check out the `message.service.ts` for registering for a sync event. And, once you have run `npm install` then `patch-package` will have updated `./node_modules/@angular/service-worker/ngsw-worker.js`. Or you can just look at the patch in `./patches/@angular/service-worker+6.0.5.patch`.

## Running the application

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/philnash/ng-sms-messages.git
$ cd ng-sms-messages
$ npm install
```

Copy `.env.example` to `.env` and fill in the your Twilio account credentials and the Twilio number you want to use. You can find your Account SID and Auth Token in your [Twilio account portal](https://www.twilio.com/user/account).

```bash
$ cp .env.example .env
```

You also need to generate VAPID keys for your application. You can do so with:

```bash
$ npx web-push generate-vapid-keys
```

Add the public key to your `src/environment.prod.ts` file.

Then start the application. You can run it in development mode with

```bash
$ npm run dev
```

This will start the front end on [http://localhost:4200](http://localhost:4200)

To use the service worker functionality, you need to create a production build and serve it. The script to perform this is:

```bash
$ npm run server
```

Navigate to [http://localhost:3000](http://localhost:3000) and you will see the application.

