import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
// firebase.initializeApp({
//   apiKey: "AIzaSyATz_NLtNlGEGwqVcOmBoxRu1-Nrgmql4s",
//   authDomain: "asteroids-vue.firebaseapp.com",
//   databaseURL: "https://asteroids-vue.firebaseio.com",
//   projectId: "asteroids-vue",
//   appId: "1:824034191772:web:ffceea2af394c84f41c059",
// });


// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
});

export const db = firebase.firestore();
export const auth = firebase.auth();
export const favoritesCollection = db.collection('favorites');