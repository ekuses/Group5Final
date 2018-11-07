// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBGeREVrvROXy5yX_iV27xlFvPwKH2Vr30",
    authDomain: "movieappforsofteng.firebaseapp.com",
    databaseURL: "https://movieappforsofteng.firebaseio.com",
    projectId: "movieappforsofteng",
    storageBucket: "movieappforsofteng.appspot.com",
    messagingSenderId: "473247957639"
  }
};
