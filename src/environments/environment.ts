// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyADz-CQRkh8j2otlGIoYF6cjcQJrkRgCO8",
    authDomain: "ion-tellevoapp.firebaseapp.com",
    projectId: "ion-tellevoapp",
    storageBucket: "ion-tellevoapp.appspot.com",
    messagingSenderId: "1006008915854",
    appId: "1:1006008915854:web:c5117dfea1782dc07eb6df",
    measurementId: "G-86DJ564GZB"
  },
  openweathermap: { 
    apiKey: "0ef7b3e8998e6ca6707241276e453865",
    url: "https://api.openweathermap.org/data/2.5/",
    urlIcon: "https://openweathermap.org/img/wn"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
