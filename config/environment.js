/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-tasks',
    podModulePrefix: 'ember-tasks/pods',
    firebase: {
      apiKey: "AIzaSyAYnUjxNFQU--AFhBsFKK9hh0D9-JJP6Jo",
      authDomain: "embertasks-b34ae.firebaseapp.com",
      databaseURL: "https://embertasks-b34ae.firebaseio.com",
      storageBucket: "embertasks-b34ae.appspot.com"
      //messagingSenderId: "1091796089031"
    },
    torii: {
      sessionServiceName: 'session'
    },
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' maps.gstatic.com",
    'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com data:",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
  };

  ENV.googleMap = {
    apiKey: 'AIzaSyDEH8hp0Z8tsu8pmBWXRe9d7W2UR-P7hL0',
    libraries: ['drawing', 'visualization']
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
